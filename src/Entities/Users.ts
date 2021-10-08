import { BaseEntity, BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import * as bcrypt from "bcrypt";

@Entity()
export class Users extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column()
    name!: string;

    @Column()
    username!: string;

    @Column()
    password!: string;

    @BeforeInsert()  
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 10);  
    }

}