import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { Repo } from './interfaces/repo.interface';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class ReposService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async getRepoList(
    accessToken: string,
    user: string,
    page: number,
    size: number,
  ): Promise<Repo[]> {
    const response = await firstValueFrom(
      this.httpService.get(
        `https://api.github.com/users/${user}/repos?type=all&per_page=${size}&page=${page}`,
        {
          headers: {
            Authorization: 'token ' + accessToken,
            Accept: 'application/vnd.github+json',
          },
        },
      ),
    );
    return response.data;
  }
}
