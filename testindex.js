// Import Server
const fastify = require("./server.js");
const { ApolloServer } = require("apollo-server-fastify");

// Import GraphQL Schema
const schema = require("./graphql_schema");

const server = new ApolloServer({
  schema: schema,
  context: "Example"
});
(async function() {
  fastify.register(server.createHandler());
  await fastify.listen(3000);
})();
