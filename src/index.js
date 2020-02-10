// Import Server
const fastify = require("./server.js");

// Import external dependancies
const gql = require("fastify-gql");

// Import GraphQL Schema
const schema = require("./schema");

// Register Fastify GraphQL
fastify.register(gql, {
  schema,
  graphiql: true
});

// Import Routes
const routes = require("./routes");
