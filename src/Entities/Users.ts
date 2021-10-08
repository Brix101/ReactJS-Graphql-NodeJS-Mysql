import { BaseEntity, BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import * as bcrypt from "bcrypt";

@Entity()
export class Users extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column()
    name!: string;

    @Column({unique:true})
    username!: string;

    @Column()
    password!: string;

    @BeforeInsert()
    @BeforeUpdate()  
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 10);  
    }

    @BeforeInsert()
    @BeforeUpdate()
    lowerCaseUsername(){
        this.username = this.username.toLowerCase();
    }

}