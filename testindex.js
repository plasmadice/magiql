// Import Server
const fastify = require("./server.js");
const { ApolloServer } = require("apollo-server-fastify");
const cardController = require("./controllers/cardController");

const { getCard, getCards, getCardsByName, getAllCards } = cardController;

// Import GraphQL Schema
const { typeDefs, resolvers } = require("./graphql_schema");

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({
    db: {
      getCard,
      getCards,
      getCardsByName,
      getAllCards
    }
  })
});
(async function() {
  fastify.register(server.createHandler());
  await fastify.listen(3000);
})();
