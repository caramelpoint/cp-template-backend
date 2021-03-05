import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  public id?: number;

  @Column({ unique: true })
  public email: string;

  @Column()
  public username: string;

  @Column()
  public password: string;

  @Column()
  public salt: string;

  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
  }
}
