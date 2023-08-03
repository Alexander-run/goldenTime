import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Journey {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  depatureDate: string;

  @Column({ nullable: true })
  fee: number;

  @Column({ nullable: true })
  depaturePositionCoordinate: string;

  @Column({ nullable: true })
  destinationPositionCoordinate: string;

  @Column({ nullable: true })
  depaturePositionName: string;

  @Column({ nullable: true })
  destinationPositionName: string;

  @Column({ nullable: true })
  leaderName: string;

  @Column({ nullable: true })
  leaderPhone: string;

  @Column({ nullable: true })
  journeyDescription: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  createTime: Date;
}
