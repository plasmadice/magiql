// Import External Dependancies
const graphql = require("graphql");

// Destructure GraphQL functions
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList
} = graphql;

// Import Controllers
const cardController = require("../controllers/cardController");

// Define Object Types
const cardType = new GraphQLObjectType({
  name: "Card",
  fields: () => ({
    _id: { type: GraphQLID },
    name: { type: GraphQLString }
  })
});

// Define Root Query
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: () => ({
    card: {
      type: { cardType },
      description: "Returns a single card using it's graphql _id",
      args: { _id: { type: GraphQLID } },
      async resolve(parent, args) {
        return await cardController.getCardById(args);
      }
    },
    cards: {
      type: new GraphQLList(cardType),
      description: "Returns multiple cards using a name value.",
      args: { name: { type: GraphQLString } },
      async resolve(parent, args) {
        return await cardController.getCardsByName(args);
      }
    }
  })
});

// Export the schema
module.exports = new GraphQLSchema({
  query: RootQuery
});
