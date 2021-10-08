import { GraphQLID, GraphQLString } from "graphql";
import { UserType } from "../TypeDefs/User";
import { Users } from "../../Entities/Users"
import { resolve } from "path";
import { Message } from "../../Interfaces/Message";
import { comparePasswords } from "../../Utils/comparePass";

export const CREATE_USER = {
    type: UserType,
    args: { // args = req.body
        name:{type: GraphQLString},
        username:{type: GraphQLString},
        password:{type: GraphQLString},
    },
    async resolve(parent: any, args: any) {
        const { name, username , password } = args;

        const isUser = await Users.findOne({where:{username}});
        if(isUser){
            throw new Error("Username Taken");
        }
        
        const user = Users.create({ name, username , password });
        
        return await Users.save(user);
    }
}

export const DELETE_USER = {
    type: UserType,
    args: {
        id : { type: GraphQLString }
    },
    async resolve(parent: any, args: any) {
        const {id} = args;
        try {
            const user = Users.findOne(id);

            if(!user){
                await Users.delete(user);
                return { success: true,
                    message:`User ${id} Deleted`,
                    statusCode: 200
                    };
            }else{
                return { success: false, message: "User Not Found", statusCode: 400};
            }
        } catch (error) {
            throw new Error("User Not Found");
        }
    }
}

export const UPDATE_PASSWORD = {
    type: UserType,
    args: {
        username:{type: GraphQLString},
        oldPassword:{type: GraphQLString},
        newPassword:{type: GraphQLString},
    },
    async resolve(parent: any, args: any): Promise<Users>{
        const { username, oldPassword, newPassword } = args;
        const user = await Users.findOne({where :{username}})

        if (!user) {
            throw new Error("User Not Found");   
        }
        const isEqual = await comparePasswords(user.password,oldPassword);

        if(!isEqual){
            throw new Error("Old Password is Incorrect");
        }

        user.password = newPassword

        return await user.save();
    }
}