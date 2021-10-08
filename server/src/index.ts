import express from "express";
import { graphqlHTTP} from "express-graphql";
import cors from "cors";
import { createConnection} from "typeorm";
import { schema } from "./Schema";

import { Users } from "./Entities/Users"


const main = async () => {

    await createConnection({
        type:"mysql",
        database:"graphqlcrud",
        username:"root",
        password:"root",
        logging:true,
        synchronize:false,
        entities:[ Users ]
    })

    const app = express();

    app.use(cors());
    app.use(express.json());
    app.use("/graphql",graphqlHTTP({
        schema,
        graphiql: true,
    }))

    app.listen(5000, ()=>{
        console.log("Server Running on Port 5000")
    })
    
}
main().catch((error)=>{
    console.log(error)
});