import {  GraphQLString } from "graphql";
import { UserType } from "../TypeDefs/User";
import { Users } from "../../Entities/Users"
import { comparePasswords } from "../../Utils/comparePass";
import { MessageType } from "../TypeDefs/Message";

export const CREATE_USER = {
    type: MessageType,
    args: { // args = req.body
        name:{type: GraphQLString},
        username:{type: GraphQLString},
        password:{type: GraphQLString},
    },
    async resolve(parent: any, args: any) {
        const { name, username , password } = args;

        const isUser = await Users.findOne({where:{username}});
        if(isUser){
            return { success: false, message: "Username Taken", statusCode: 400};
        }
        
        const user = Users.create({ name, username , password });

        await Users.save(user);

        return { success: false, message: "User Created", statusCode: 200};

    }
}

export const DELETE_USER = {
    type: MessageType,
    args: {
        id : { type: GraphQLString }
    },
    async resolve(parent: any, args: any) {
        const {id} = args;
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
    }
}

export const UPDATE_PASSWORD = {
    type: MessageType,
    args: {
        username:{type: GraphQLString},
        oldPassword:{type: GraphQLString},
        newPassword:{type: GraphQLString},
    },
    async resolve(parent: any, args: any){
        const { username, oldPassword, newPassword } = args;
        const user = await Users.findOne({where :{username}})

        if (!user) {
            return { success: false, message: "User Not Found", statusCode: 400}; 
        }
        const isEqual = await comparePasswords(user.password,oldPassword);

        if(!isEqual){
            return { success: false, message: "Password Not Equal", statusCode: 400};
        }

        user.password = newPassword

        await user.save();
        return { success: true, message: "Password Updated", statusCode: 200};
    }
}