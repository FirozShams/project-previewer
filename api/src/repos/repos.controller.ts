import {
  Controller,
  Get,
  UseGuards,
  Req,
  Query,
  ParseIntPipe,
  DefaultValuePipe,
  Param,
} from '@nestjs/common';
import { ReposService } from './repos.service';
import { AuthGuard } from 'src/common/guards';
import { Request } from 'express';

@Controller('repos')
export class ReposController {
  constructor(private readonly reposService: ReposService) {}

  @UseGuards(AuthGuard)
  @Get(':username')
  async getMedia(
    @Req() request: Request,
    @Param() params,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page?: number,
    @Query('size', new DefaultValuePipe(10), ParseIntPipe) size?: number,
  ) {
    const repoData = await this.reposService.getRepoList(
      request['access_token'],
      params.username,
      page,
      size,
    );
    return repoData;
  }
}
