const mongoose = require("mongoose");
const schemas = require("../schemas");
// TODO: import other things
const {
  ImageLink,
  Legalities,
  MultiFace,
  Preview,
  // Prices,
  PurchaseLink,
  RelatedCards,
  RelatedLink
} = schemas;

var cardSchema = new mongoose.Schema({
  // Core Card Fields
  arena_id: Number,
  id: { type: String, required: true },
  lang: { type: String, required: true },
  mtgo_id: Number,
  mtgo_foil_id: Number,
  multiverse_ids: { type: [Number], default: undefined },
  tcgplayer_id: Number,
  object: { type: String, required: true },
  oracle_id: { type: String, required: true },
  prints_search_uri: { type: String, required: true },
  rulings_uri: { type: String, required: true },
  scryfall_uri: { type: String, required: true },
  uri: { type: String, required: true },

  // Gameplay Fields
  all_parts: [RelatedCards],
  card_faces: [MultiFace],
  cmc: { type: Number, required: true },
  colors: { type: [String], default: undefined }, // if empty [] === colorless else (null or missing) === not pertinent
  color_identity: { type: [String], default: undefined, required: true },
  color_indicator: { type: [String], default: undefined },
  edhrec_rank: Number,
  foil: { type: Boolean, required: true },
  hand_modifier: String,
  layout: { type: String, required: true },
  legalities: { type: Legalities, required: true },
  life_modifier: String,
  loyalty: String,
  mana_cost: String,
  name: { type: String, required: true },
  nonfoil: { type: String, required: true },
  oracle_text: String,
  oversized: { type: Boolean, required: true },
  power: String,
  reserved: { type: Boolean, required: true },
  toughness: String,
  type_line: { type: String, required: true },

  // Print Fields
  artist: String,
  booster: { type: Boolean, required: true },
  border_color: { type: String, required: true },
  card_back_id: { type: String, required: true },
  collector_number: { type: String, required: true },
  digital: { type: Boolean, required: true },
  flavor_text: String,
  frame_effects: { type: [String], default: undefined },
  frame: { type: String, required: true },
  full_art: { type: Boolean, required: true },
  games: { type: [String], required: true },
  highres_image: { type: Boolean, required: true },
  illustration_id: String,
  image_uris: ImageLink,
  preview: Preview,
  // prices: Prices,
  printed_name: String,
  printed_text: String,
  printed_type_line: String,
  promo_types: { type: [String], default: undefined },
  // purchase_uris: PurchaseLink,
  rarity: { type: String, required: true },
  related_uris: { type: RelatedLink, required: true },
  released_at: { type: String, required: true },
  reprint: { type: Boolean, required: true },
  scryfall_set_uri: { type: String, required: true },
  set_name: { type: String, required: true },
  set_search_uri: { type: String, required: true },
  set_type: { type: String, required: true },
  set_uri: { type: String, required: true },
  set: { type: String, required: true },
  story_spotlight: { type: Boolean, required: true },
  textless: { type: Boolean, required: true },
  variation: { type: Boolean, required: true },
  variation_of: String,
  watermark: String,
  json: { type: String, required: true }
});

module.exports = mongoose.model("Card", cardSchema);
