const { gql } = require("apollo-server");

const typeDefs = gql`
  """
  Links related to the card.
  """
  type RelatedLink {
    _id: ID!
    gatherer: String
    tcgplayer_decks: String
    edhrec: String
    mtgtop8: String
  }

  """
  Links leading to places where the card can be purchased
  """
  type PurchaseLink {
    _id: ID!
    tcgplayer: String
    cardmarket: String
    cardhoarder: String
  }

  """
  Info related to the preview of the card if available
  """
  type Preview {
    _id: ID!
    source: String
    source_uri: String
    previewed_at: String
  }

  """
  Price of the card in different currencies
  """
  type Prices {
    _id: ID!
    usd: String
    usd_foil: String
    eur: String
    tix: String
  }

  """
  Legality of this card in different formats
  """
  type Legalities {
    _id: ID!
    standard: String
    future: String
    historic: String
    pioneer: String
    modern: String
    legacy: String
    pauper: String
    vintage: String
    penny: String
    commander: String
    brawl: String
    duel: String
    oldschool: String
  }

  """
  Images of the card
  """
  type ImageLink {
    _id: ID!
    small: String
    normal: String
    large: String
    art_crop: String
    border_crop: String
    png: String
  }

  """
  Cards related to the card
  """
  type RelatedCards {
    _id: ID!
    id: String!
    object: String!
    component: String!
    name: String!
    type_line: String!
    uri: String!
  }

  """
  Information about the 'other' side of the card
  """
  type MultiFace {
    _id: ID!
    artist: String
    color_indicator: [String]
    colors: [String]
    flavor_text: String
    illustration_id: String
    image_uris: ImageLink
    loyalty: String
    mana_cost: String
    name: String
    object: String
    oracle_text: String
    power: String
    printed_name: String
    printed_type_line: String
    toughness: String
    type_line: String
    watermark: String
  }

  """
  A unique card object for every MTG card
  """
  type Card {
    _id: ID!
    arena_id: Int
    id: ID!
    lang: String!
    mtgo_id: Int
    mtgo_foil_id: Int
    multiverse_ids: [Int]
    tcgplayer_id: Int
    object: String!
    oracle_id: String!
    prints_search_uri: String!
    rulings_uri: String!
    scryfall_uri: String!
    uri: String!
    all_parts: [RelatedCards]
    card_faces: [MultiFace]
    cmc: Int!
    colors: [String]
    color_identity: [String]!
    edhrec_rank: Int
    foil: Boolean!
    hand_modifier: String
    layout: String!
    legalities: Legalities!
    life_modifier: String
    loyalty: String
    mana_cost: String
    name: String!
    nonfoil: String!
    oracle_text: String
    oversized: Boolean!
    power: String
    reserved: Boolean!
    toughness: String
    type_line: String!
    artist: String
    booster: Boolean!
    border_color: String!
    card_back_id: String!
    collector_number: String!
    digital: Boolean!
    flavor_text: String
    frame_effects: [String]
    frame: String!
    full_art: Boolean!
    games: [String]!
    highres_image: Boolean!
    illustration_id: String
    image_uris: ImageLink
    preview: Preview
    prices: Prices
    printed_name: String
    printed_text: String
    printed_type_line: String
    promo_type: [String]
    purchase_uris: PurchaseLink
    rarity: String!
    related_uris: RelatedLink!
    released_at: String!
    reprint: Boolean!
    scryfall_set_uri: String!
    set_name: String!
    set_search_uri: String!
    set_type: String!
    set_uri: String!
    set: String!
    story_spotlight: Boolean!
    textless: Boolean!
    variation: Boolean!
    variation_of: String
    watermark: String
    json: String!
  }
`;

const resolverMap = {
  Query: {
    author(obj, args, context, info) {
      return find(authors, { id: args.id });
    }
  },
  Author: {
    posts(author) {
      return filter(posts, { authorId: author.id });
    }
  }
};

const resolverMap = {
  Query: {
    card(obj, args, context, info) {
      return find(authors, { id: args.id });
    }
  },
  Author: {
    posts(author) {
      return filter(posts, { authorId: author.id });
    }
  }
};

module.exports = typeDefs;
