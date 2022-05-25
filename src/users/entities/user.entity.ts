import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';
@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', { unique: true })
  name: string;

  @Column({ select: false })
  password: string;
}
