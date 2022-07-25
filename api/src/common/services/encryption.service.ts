import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createCipheriv, createDecipheriv } from 'crypto';

@Injectable()
export class EncryptionService {
  constructor(private configService: ConfigService) {}

  encrypt(inputValue: string): string {
    const cipher = createCipheriv(
      'aes-256-cbc',
      this.configService.get('ENCRYPTION_SECRET'),
      this.configService.get('ENCRYPTION_IV'),
    );
    let encrypted = cipher.update(inputValue, 'utf8', 'base64');
    encrypted += cipher.final('base64');
    return encrypted;
  }

  decrypt(encrypted): string {
    const decipher = createDecipheriv(
      'aes-256-cbc',
      this.configService.get('ENCRYPTION_SECRET'),
      this.configService.get('ENCRYPTION_IV'),
    );
    const decrypted = decipher.update(encrypted, 'base64', 'utf8');
    return decrypted + decipher.final('utf8');
  }
}
