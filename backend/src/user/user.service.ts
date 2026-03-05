import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
    constructor(private readonly prisma: PrismaService) {}
    async updateProfile(userId: string, profileData: any) {
        const updatedUser = await this.prisma.user.update({
            where: { id: userId },
            data: profileData,
        });
        return updatedUser;
    }

    async getUserById(userId: string) {
        return this.prisma.user.findUnique({
            where: { id: userId },
            select:{
                id: true,
                email: true,
                name: true,
                bio: true,
                gender: true,
                hostel: true,
                createdAt: true
            }
        });
    }

}
