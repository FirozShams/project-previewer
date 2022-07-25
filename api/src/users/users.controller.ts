import { Controller, Get, Post, Body, UseGuards, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from 'src/common/guards';
import { Request } from 'express';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AuthGuard)
  @Get('/self')
  async getMedia(@Req() request: Request) {
    const userData = await this.usersService.getUserDetails(
      request['access_token'],
    );
    return { ...userData };
  }

  @Post('/authenticate')
  async addMediaFromUrls(@Body() body: { code: string }) {
    const token = await this.usersService.authenticate(body.code);
    return {
      token,
    };
  }
}
