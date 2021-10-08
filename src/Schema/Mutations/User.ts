import { GraphQLString } from "graphql";
import { UserType } from "../TypeDefs/User";
import { Users } from "../../Entities/Users"

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