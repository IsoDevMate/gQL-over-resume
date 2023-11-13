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


async function startServer() {
try{
  const typeDefs = gql(fs.readFileSync(path.resolve(__dirname, './schema.graphql'), 'utf-8'));

  const schema = buildSubgraphSchema({ typeDefs, resolvers });
const server = new ApolloServer({
  schema
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