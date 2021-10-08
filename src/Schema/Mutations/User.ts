import { GraphQLID, GraphQLString } from "graphql";
import { UserType } from "../TypeDefs/User";
import { Users } from "../../Entities/Users"
import { resolve } from "path";
import { Message } from "../../Interfaces/Message";

export const CREATE_USER = {
    type: UserType,
    args: { // args = req.body
        name:{type: GraphQLString},
        username:{type: GraphQLString},
        password:{type: GraphQLString},
    },
    async resolve(parent: any, args: any) {
        const { name, username , password } = args;
        const user = Users.create({ name, username , password });
        
        return await Users.save(user);
    }
}

export const DELETE_USER = {
    type: UserType,
    args: {
        id : { type: GraphQLString }
    },
    async resolve(parent: any, args: any): Promise<Message> {
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
            throw { success: false, message: "User Not Found"};
        }
    }
}