import { ShortLink } from './../../short-link/entities/short-link.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', { unique: true })
  name: string;

  @Column({ select: false })
  password: string;

  @OneToMany(() => ShortLink, (link) => link.user)
  links: string;
}
