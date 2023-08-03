import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Requesters {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  ipAddress: string;

  @Column({ nullable: true })
  createDate: string;

  @Column({ nullable: true })
  tryCount: number;
}
