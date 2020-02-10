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

const relatedLinkType = new GraphQLObjectType({
  name: "RelatedLink",
  description: "Links related to the card.",
  fields: () => ({
    _id: { type: GraphQLID },
    gatherer: { type: GraphQLString },
    tcgplayer_decks: { type: GraphQLString },
    edhrec: { type: GraphQLString },
    mtgtop8: { type: GraphQLString }
  })
});

const purchaseLinkType = new GraphQLObjectType({
  name: "PurchaseLink",
  description: "Links leading to places where the card can be purchased.",
  fields: () => ({
    _id: { type: GraphQLID },
    tcgplayer: { type: GraphQLString },
    cardmarket: { type: GraphQLString },
    cardhoarder: { type: GraphQLString }
  })
});

const previewType = new GraphQLObjectType({
  name: "Preview",
  description: "Info related to the preview of the card if available.",
  fields: () => ({
    _id: { type: GraphQLID },
    source: { type: GraphQLString },
    source_uri: { type: GraphQLString },
    previewed_at: { type: GraphQLString }
  })
});

const pricesType = new GraphQLObjectType({
  name: "Prices",
  description: "Price of the card in different currencies.",
  fields: () => ({
    _id: { type: GraphQLID },
    usd: { type: GraphQLString },
    usd_foil: { type: GraphQLString },
    eur: { type: GraphQLString },
    tix: { type: GraphQLString }
  })
});

const legalitiesType = new GraphQLObjectType({
  name: "Legalities",
  description: "Legality of this card in different formats.",
  fields: () => ({
    _id: { type: GraphQLID },
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
  description: "Images of the card.",
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
  description: "Cards related to the card.",
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
  description: "Information about the 'other' side of the card.",
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
  description: "A unique card object for every MTG card",
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
    artist: { type: GraphQLString },
    booster: { type: GraphQLBoolean },
    border_color: { type: GraphQLString },
    card_back_id: { type: GraphQLString },
    collector_number: { type: GraphQLString },
    flavor_text: { type: GraphQLString },
    frame_effects: { type: new GraphQLList(GraphQLString) },
    frame: { type: GraphQLString },
    full_art: { type: GraphQLBoolean },
    games: { type: new GraphQLList(GraphQLString) },
    highres_image: { type: GraphQLBoolean },
    illustration_id: { type: GraphQLString },
    image_uris: { type: imageLinkType },
    preview: { type: previewType },
    prices: { type: pricesType },
    printed_name: { type: GraphQLString },
    printed_text: { type: GraphQLString },
    printed_type_line: { type: GraphQLString },
    promo_type: { type: new GraphQLList(GraphQLString) },
    purchase_uris: { type: purchaseLinkType },
    rarity: { type: GraphQLString },
    related_uris: { type: relatedLinkType },
    released_at: { type: GraphQLString },
    reprint: { type: GraphQLBoolean },
    scryfall_set_uri: { type: GraphQLString },
    set_name: { type: GraphQLString },
    set_search_uri: { type: GraphQLString },
    set_type: { type: GraphQLString },
    set_uri: { type: GraphQLString },
    set: { type: GraphQLString },
    story_spotlight: { type: GraphQLBoolean },
    textless: { type: GraphQLBoolean },
    variation: { type: GraphQLBoolean },
    variation_of: { type: GraphQLString },
    watermark: { type: GraphQLString },
    json: { type: GraphQLString }
  })
});

// Define Root Query
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: () => ({
    card: {
      type: cardType,
      description: "Returns a single card using one of it's IDs (id && _id)",
      args: {
        _id: { type: GraphQLID },
        id: { type: GraphQLString }
      },
      async resolve(parent, args) {
        return await cardController.getCardById(args);
      }
    },
    cards: {
      type: new GraphQLList(cardType),
      description: "Returns card(s) using a name value.",
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
