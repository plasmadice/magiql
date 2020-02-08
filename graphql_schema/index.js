// Import External Dependancies
const graphql = require("graphql");

// Destructure GraphQL functions
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList,
  GraphQLInt,
  GraphQLBoolean
} = graphql;

// Import Controllers
const cardController = require("../controllers/cardController");

const legalitiesType = new GraphQLObjectType({
  name: "Legalities",
  fields: () => ({
    standard: { type: GraphQLString },
    future: { type: GraphQLString },
    historic: { type: GraphQLString },
    pioneer: { type: GraphQLString },
    modern: { type: GraphQLString },
    legacy: { type: GraphQLString },
    pauper: { type: GraphQLString },
    vintage: { type: GraphQLString },
    penny: { type: GraphQLString },
    commander: { type: GraphQLString },
    brawl: { type: GraphQLString },
    duel: { type: GraphQLString },
    oldschool: { type: GraphQLString }
  })
});

const imageLinkType = new GraphQLObjectType({
  name: "ImageLink",
  fields: () => ({
    _id: { type: GraphQLID },
    small: { type: GraphQLString },
    normal: { type: GraphQLString },
    large: { type: GraphQLString },
    art_crop: { type: GraphQLString },
    border_crop: { type: GraphQLString },
    png: { type: GraphQLString }
  })
});

const relatedCardsType = new GraphQLObjectType({
  name: "RelatedCards",
  fields: () => ({
    _id: { type: GraphQLID },
    id: { type: GraphQLString },
    object: { type: GraphQLString },
    component: { type: GraphQLString },
    name: { type: GraphQLString },
    type_line: { type: GraphQLString },
    uri: { type: GraphQLString }
  })
});

const multiFaceType = new GraphQLObjectType({
  name: "MultiFace",
  fields: () => ({
    _id: { type: GraphQLID },
    artist: { type: GraphQLString },
    color_indicator: { type: new GraphQLList(GraphQLString) },
    colors: { type: new GraphQLList(GraphQLString) },
    flavor_text: { type: GraphQLString },
    illustration_id: { type: GraphQLString },
    image_uris: { type: imageLinkType },
    loyalty: { type: GraphQLString },
    mana_cost: { type: GraphQLString },
    name: { type: GraphQLString },
    object: { type: GraphQLString },
    oracle_text: { type: GraphQLString },
    power: { type: GraphQLString },
    printed_name: { type: GraphQLString },
    printed_type_line: { type: GraphQLString },
    toughness: { type: GraphQLString },
    type_line: { type: GraphQLString },
    watermark: { type: GraphQLString }
  })
});

// Define Object Types
const cardType = new GraphQLObjectType({
  name: "Card",
  fields: () => ({
    _id: { type: GraphQLID },
    arena_id: { type: GraphQLInt },
    id: { type: GraphQLString },
    lang: { type: GraphQLString },
    mtgo_id: { type: GraphQLInt },
    mtgo_foil_id: { type: GraphQLInt },
    multiverse_ids: { type: new GraphQLList(GraphQLInt) },
    tcgplayer_id: { type: GraphQLInt },
    object: { type: GraphQLString },
    oracle_id: { type: GraphQLString },
    prints_search_uri: { type: GraphQLString },
    rulings_uri: { type: GraphQLString },
    scryfall_uri: { type: GraphQLString },
    uri: { type: GraphQLString },
    all_parts: { type: new GraphQLList(relatedCardsType) },
    card_faces: { type: new GraphQLList(multiFaceType) },
    cmc: { type: GraphQLInt },
    colors: { type: new GraphQLList(GraphQLString) },
    color_identity: { type: new GraphQLList(GraphQLString) },
    edhrec_rank: { type: GraphQLInt },
    foil: { type: GraphQLBoolean },
    hand_modifier: { type: GraphQLString },
    layout: { type: GraphQLString },
    legalities: { type: legalitiesType },
    life_modifier: { type: GraphQLString },
    loyalty: { type: GraphQLString },
    mana_cost: { type: GraphQLString },
    name: { type: GraphQLString },
    nonfoil: { type: GraphQLString },
    oracle_text: { type: GraphQLString },
    oversized: { type: GraphQLBoolean },
    power: { type: GraphQLString },
    reserved: { type: GraphQLBoolean },
    toughness: { type: GraphQLString },
    type_line: { type: GraphQLString },

    name: { type: GraphQLString }
  })
});

// Define Root Query
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: () => ({
    card: {
      type: cardType,
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
