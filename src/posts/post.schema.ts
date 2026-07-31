import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { PostStatus } from './enums/postStatus.enum';
import mongoose, { Document } from 'mongoose';
import { User } from 'src/users/user.schema';

@Schema()
export class Post extends Document {
  @Prop({
    type: String,
    isRequired: true,
  })
  title!: string;

  @Prop({
    type: String,
    isRequired: true,
  })
  slug!: string;

  @Prop({
    type: String,
    isRequired: true,
    enum: PostStatus,
    default: PostStatus.PUBLISHED,
  })
  status!: PostStatus;

  @Prop({
    type: String,
    isRequired: true,
  })
  content!: string;

  @Prop({
    type: String,
    isRequired: false,
  })
  featureImgUrl?: string;

  @Prop({
    type: Date,
    isRequired: false,
  })
  publishOn?: Date;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: User.name,
  })
  author!: User;
}

export const PostSchema = SchemaFactory.createForClass(Post);
