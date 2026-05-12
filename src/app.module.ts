import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { Post } from './posts/post.entity';
import { TagsModule } from './tags/tags.module';
import { PostMetaController } from './post-meta/post-meta.controller';
import { PostMetaModule } from './post-meta/post-meta.module';

@Module({
  imports: [
    UsersModule,
    PostsModule,
    AuthModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      // entities: [User, Post],
      autoLoadEntities: true,
      synchronize: true,
      port: 5432,
      username: 'postgres',
      password: 'password',
      host: 'localhost',
      database: 'nest-app',
    }),
    TagsModule,
    PostMetaModule,
  ],
  controllers: [AppController, PostMetaController],
  providers: [AppService],
})
export class AppModule {}
