import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Cases {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  depatureDate: string;

  @Column({ nullable: true })
  headCount: number;

  @Column({ nullable: true })
  isCheckedIn: boolean;

  @Column({ nullable: true })
  createTime: Date;
}
