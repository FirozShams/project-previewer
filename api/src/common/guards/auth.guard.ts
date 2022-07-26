import { Injectable, UnauthorizedException } from '@nestjs/common';
import { EncryptionService } from 'src/common/services/encryption.service';

export interface TokenDto {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  refresh_token_expires_in: number;
  scope: string;
  token_type: string;
}

@Injectable()
export class AuthGuard {
  constructor(private encryptionService: EncryptionService) {}

  async canActivate(context) {
    const request = context.switchToHttp().getRequest();
    const rawToken = request.headers['authorization'];
    if (!rawToken) {
      throw new UnauthorizedException('Invalid access token!');
    }
    const decryptedToken = this.encryptionService.decrypt(rawToken);

    try {
      const tokenDetails: TokenDto = JSON.parse(decryptedToken);
      request['access_token'] = tokenDetails.access_token;
      return true;
    } catch (error) {
      throw new UnauthorizedException('Invalid access token!');
    }
  }
}
