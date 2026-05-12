import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostMeta } from './post-meta.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PostMeta])],
})
export class PostMetaModule {}
