import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { EncryptionService } from 'src/common/services/encryption.service';
import { User } from './interfaces/user.interface';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class UsersService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
    private readonly encryptionService: EncryptionService,
  ) {}

  async authenticate(code: string) {
    const response = await firstValueFrom(
      this.httpService.post(
        'https://github.com/login/oauth/access_token',
        {
          client_id: this.configService.get('GITHUB_CLIENT_ID'),
          client_secret: this.configService.get('GITHUB_CLIENT_SECRET'),
          code,
        },
        { headers: { Accept: 'application/json' } },
      ),
    );
    return this.encryptionService.encrypt(JSON.stringify(response.data));
  }

  async getUserDetails(accessToken: string): Promise<User> {
    const response = await firstValueFrom(
      this.httpService.get('https://api.github.com/user', {
        headers: {
          Authorization: 'token ' + accessToken,
          Accept: 'application/vnd.github+json',
        },
      }),
    );
    return response.data;
  }
}
