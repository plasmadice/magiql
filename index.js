// Import Server
const fastify = require("./server.js");
const { ApolloServer } = require("apollo-server-fastify");
const cardController = require("./controllers/cardController");

// Import GraphQL Schema
const { typeDefs, resolvers } = require("./graphql_schema");
// Import database functions
const { getCard, getCards, getCardsByName, getAllCards } = cardController;
const PORT = process.env.PORT || 4000;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: true,
  introspection: true,
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
  await fastify.listen(PORT, (err, address) => {
    if (err) {
      fastify.log.error(err);
      process.exit(1);
    } else {
      console.log(`Server started at ${address}`);
    }
  });
})();
