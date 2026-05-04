import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { postStatus } from './enums/postStatus.enum';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({
    type: 'varchar',
    length: 256,
    nullable: false,
  })
  title!: string;

  @Column({
    type: 'varchar',
    length: 256,
    nullable: false,
  })
  slug!: string;

  @Column({
    type: 'enum',
    enum: postStatus,
    nullable: false,
    default: postStatus.DRAFT,
  })
  status!: postStatus;

  @Column({
    type: 'text',
    nullable: false,
  })
  content!: string;

  @Column({
    type: 'varchar',
    length: 256,
    nullable: false,
  })
  featureImgUrl?: string;

  @Column({
    type: 'timestamp',
    nullable: true,
  })
  publishOn?: string;

  tags?: string[];
}
