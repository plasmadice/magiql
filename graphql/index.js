// Import External Dependancies
const graphql = require("graphql");

// Destructure GraphQL functions
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLID,
  GraphQLList,
  GraphQLNonNull
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
  fields: {
    id: {},
    name: {}
  }
});

// Export the schema
module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutations
});
