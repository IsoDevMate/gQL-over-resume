const { GraphQLError } = require('graphql');
const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const json = express.json;
const cors = require("cors");
const { gql }= require("graphql-tag");
const { ApolloServer } = require("@apollo/server");
const { buildSubgraphSchema } = require("@apollo/subgraph");
const { expressMiddleware } = require("@apollo/server/express4");
const resolvers = require("./resolvers.js");
//const { readFileSync } = require("fs");
const {  dirname } = require("path");
const { rule, shield,allow,deny,and,or,inputRule } = require('graphql-shield')
const { applyMiddleware }=require('graphql-middleware')
//const {graphqlHTTP} = require('express-graphql');


require('dotenv').config();
const mongoose = require("mongoose");
const { typeDefs } = require('./models/schema.js');
const { connectDB } = require('./db.js');
const port = process.env.PORT || 4000


const bodyParser = require("body-parser");
//const  routes = require("./routes/routers");

__dirname = dirname(__filename);


// connect Database
connectDB(); 


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());



const isAuthenticated = rule({ cache: 'contextual' })(
  async (parent, args, { user }, info) => {
    return user !== null;
  },
);
/*const isAuthenticated=rule()(async(parent,args,ctx,info)=>{
    return ctx.user!==null
}
)*/

const isadmin=rule()(async(parent,args,ctx,info)=>{
  const user=await user.find(({id})=>id===ctx.user.id)
  return user && user.role==='admin'
})

const isGuest=rule()(async(parent,args,ctx,info)=>{
  return ctx.user===null
})

const isUser=rule()(async(parent,args,ctx,info)=>{
  const user=await user.find(({id})=>id===ctx.user.id)
  return user
})

const isNotRegistered = rule()(async(parent, args, ctx, info) => {
  const user = await user.findOne({ email: args.input.email });
  return !user;
});

const permissions = shield({
  Query: {
  
    personalInfo: isUser, // Only authenticated users can view personalInfo
    education: deny,
    experience: allow,
    skills: allow,
    activities: allow,
    projects: isGuest, // Only guests can view projects
    me: isAuthenticated,
    users: isAuthenticated,
    /* { 
       password: rule({ cache: 'contextual' })(
      async (parent, args, { user }, info) => {
        return user.id === parent.id;
      },
    ),
  },*/
  },
  Mutation: {
    '*': isAuthenticated || isadmin,  
    createuser: isNotRegistered,
    createuser: allow, // Anyone can create a user
    createpost: isadmin
  }
})


// Define a function to authenticate requests
function authenticate(req) {
  // Implement your custom authentication logic here
  // For example, you might check if the user is logged in and has the necessary permissions to access the requested data
  // If the user is not authenticated, throw an error
  if (!req.user) {
    throw new Error('You must be logged in to access this resource')
  }
}





async function startServer() {
try{
  const typeDefs = gql(fs.readFileSync(path.resolve(__dirname, './schema.graphql'), 'utf-8'));

  const schema = buildSubgraphSchema({ typeDefs, resolvers,
      context: ({req}) => {
        if(req.path === '/graphql' && req.method === 'POST') {
          return {} 
        } else {
          authenticate(req);  
          return {user: req.user}
        }
      }
    })
  
    

    const schemaWithMiddleware = applyMiddleware(schema,permissions)

const server = new ApolloServer({
  schema:schemaWithMiddleware
});
await server.start();

//entry point to our graphQl api


app.use(
  '/graphql',
  cors(),
  json(),
  expressMiddleware(server),
);




} catch (error) {
    if (error instanceof GraphQLError) {
      console.log(error.message + `\n in ${error.source?.name}`)
    }
    throw error
  }

 //  documents= typeDefs

// start the Express server
mongoose.connection.once('open',()=>{
    console.log(`Connected Successfully to the Database: ${mongoose.connection.name}`)
    app.listen(port, () => {
      console.log(`app is running at localhost:${port}`);
    });
    })
    .on('error', (error) => {
      console.log(`Connection error: ${error.message}`);
    });
}
startServer();