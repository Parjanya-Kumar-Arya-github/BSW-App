import * as fs from 'fs';
import * as path from 'path';
import { Injectable, Logger, OnModuleInit, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PyqsDTO } from './pyqs.dto';
import {Cron} from '@nestjs/schedule';

@Injectable()
export class PyqsService implements OnModuleInit {
  private readonly logger = new Logger(PyqsService.name);

  private readonly BASE_DIR = path.resolve(process.cwd(), 'public', 'pyqs');
  private readonly TREE_ID = 'pyqs_tree';

  constructor(private prisma: PrismaService) {}

  /* -------------------- SECURITY HELPERS -------------------- */

  private sanitizeSegment(value: string): string {
    const cleaned = value.trim().replace(/[^a-zA-Z0-9_-]/g, '');
    if (!cleaned || cleaned.includes('..')) {
      throw new BadRequestException('Invalid path segment');
    }
    return cleaned;
  }

  private generateSafeFilename(originalName: string): string {
    const ext = path.extname(originalName).toLowerCase();
    const allowed = ['.pdf', '.jpg', '.jpeg', '.png'];

    if (!allowed.includes(ext)) {
      throw new BadRequestException('Unsupported file extension');
    }

    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 8);

    return `file_${timestamp}_${random}${ext}`;
  }

  /* -------------------- DIRECTORY SETUP -------------------- */

  private ensurePyqsDir(): void {
    fs.mkdirSync(this.BASE_DIR, { recursive: true });
  }

  /* -------------------- TREE WALK -------------------- */

  private walk(dir: string, base = ''): any[] {
    if (!fs.existsSync(dir)) return [];

    return fs.readdirSync(dir, { withFileTypes: true }).map(entry => {
      const full = path.join(dir, entry.name);
      const rel = path.join(base, entry.name);

      if (entry.isDirectory()) {
        return {
          name: entry.name,
          type: 'folder',
          path: rel,
          children: this.walk(full, rel),
        };
      }

      return {
        name: entry.name,
        type: 'file',
        path: rel,
      };
    });
  }

  /* -------------------- LIFECYCLE -------------------- */

  async onModuleInit() {
    this.ensurePyqsDir();
    await this.regenerateTree();
  }

  async regenerateTree() {
    this.ensurePyqsDir();
    const tree = this.walk(this.BASE_DIR);

    await this.prisma.fileTree.upsert({
      where: { id: this.TREE_ID },
      update: { tree },
      create: { id: this.TREE_ID, tree },
    });

    this.logger.log('PYQS tree regenerated');
    return tree;
  }

  async getTreeFromDatabase() {
    const record = await this.prisma.fileTree.findUnique({
      where: { id: this.TREE_ID },
    });
    return record?.tree || [];
  }

  // Runs every day at 3:00 AM
  @Cron('0 3 * * *')
  async regenerateTreeCron() {
    this.logger.log('Cron: regenerating PYQS tree');
    await this.regenerateTree();
  }


  /* -------------------- UPLOAD -------------------- */

  async uploadFile(
    data: PyqsDTO,
    file: Express.Multer.File,
    userId: string,
  ) {
    this.ensurePyqsDir();

    const dept = this.sanitizeSegment(data.dept);
    const course = this.sanitizeSegment(data.course);
    const type = this.sanitizeSegment(data.type);

    const safeFilename = this.generateSafeFilename(file.originalname);

    /**
     * FINAL SAFE PATH:
     * public/pyqs/<dept>/<course>/<type>/<file>
     */
    const relativePath = path.join(
      'pyqs',
      dept,
      course,
      type,
      safeFilename,
    );

    const fullPath = path.join(process.cwd(), 'public', relativePath);

    fs.mkdirSync(path.dirname(fullPath), { recursive: true });
    fs.writeFileSync(fullPath, file.buffer);

    this.logger.log(`Uploaded PYQ: ${relativePath}`);

    const tree = await this.regenerateTree();

    return {
      success: true,
      path: relativePath,
      tree,
    };
  }
}
