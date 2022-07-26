import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ReposController } from './repos.controller';
import { ReposService } from './repos.service';

@Module({
  imports: [HttpModule],
  controllers: [ReposController],
  providers: [ReposService],
  exports: [ReposService],
})
export class ReposModule {}
