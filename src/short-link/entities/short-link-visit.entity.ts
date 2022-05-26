import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ShortLink } from './short-link.entity';

@Entity({ name: 'short_link_visit' })
export class ShortLinkVisit {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => ShortLink, (short) => short.visits)
  @JoinColumn({ name: 'link_id' })
  link: ShortLink;

  @Column({ type: 'inet' })
  ip: string;

  @CreateDateColumn({ name: 'visit_at', type: 'timestamp with time zone' })
  visit_at: Date;
}
