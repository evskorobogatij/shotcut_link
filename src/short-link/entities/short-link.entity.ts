import { User } from './../../users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ShortLinkVisit } from './short-link-visit.entity';

@Entity({ name: 'short_link' })
export class ShortLink {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  short: string;

  @Column()
  link: string;

  @ManyToOne(() => User, (user) => user.links)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(() => ShortLinkVisit, (v) => v.link)
  visits: ShortLinkVisit[];

  @CreateDateColumn({ name: 'created_at', type: 'timestamp with time zone' })
  create_at: Date;
}
