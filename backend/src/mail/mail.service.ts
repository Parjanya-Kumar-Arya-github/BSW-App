import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
    private readonly logger = new Logger(MailService.name); // 1. Use NestJS Logger
    private transport;

    constructor() {
        this.transport = nodemailer.createTransport({
            host: process.env.EMAIL_HOST || 'smtp.iitd.ac.in',
            port: process.env.EMAIL_PORT ? parseInt(process.env.EMAIL_PORT) : 465,
            secure: true, // Use true for 465, false for 587
            auth: {
                user: process.env.EMAIL_USR,
                pass: process.env.EMAIL_PASS,
            },
            tls: {
                // strict security (remove this block if IITD certs are failing)
                rejectUnauthorized: false 
            }
        });
    }

    async sendMail(to: string, subject: string, htmlString?: string) {
        try {
            console.log(`BSW Dev Team <${process.env.EMAIL_USR}>`); // Debug: Log the 'from' address
            await this.transport.sendMail({
                // 2. FIX: Ensure 'from' matches the authenticated user
                from: `BSW Dev Team <${process.env.EMAIL_USR}>`, 
                to,
                subject,
                html: htmlString,
            });
            this.logger.log(`Email sent successfully to ${to}`);
        } catch (error: any) {
            this.logger.error(`Failed to send email to ${to}`, error.stack);

            if (error.code === 'EAUTH') {
                this.logger.error('SMTP Authentication Failed. Check EMAIL_USR and EMAIL_PASS.');
            }
            
            // 3. Throw the HTTP exception so the client knows it failed
            throw new InternalServerErrorException("Email Service is currently unavailable.");
        }
    }
}