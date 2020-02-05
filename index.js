var mongoose = require("mongoose");
require("dotenv").config();
console.log(process.env.DB_CONNECT);
const DB_CONNECT = process.env.DB_CONNECT;

mongoose.connect(DB_CONNECT, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

var LegalitiesSchema = new mongoose.Schema({
  standard: String,
  future: String,
  historic: String,
  pioneer: String,
  modern: String,
  legacy: String,
  pauper: String,
  vintage: String,
  penny: String,
  commander: String,
  brawl: String,
  duel: String,
  oldschool: String
});
var ImageLinkSchema = new m();
ongoose.Schema({
  small: String,
  normal: String,
  large: String,
  art_crop: String,
  border_crop: String,
  png: String
});

var PricesSchema = new mongoose.Schema({
  usd: String,
  usd_foil: String,
  eur: String,
  tix: String
});

var PurchaseLinkSchema = new mongoose.Schema({
  tcgplayer: String,
  cardmarket: String,
  cardhoarder: String
});

var RelatedLinkSchema = new mongoose.Schema({
  gatherer: String,
  tcgplayer_decks: String,
  edhrec: String,
  mtgtop8: String
});

var PreviewSchema = new mongoose.Schema({
  source: String,
  source_uri: String,
  previewed_at: Date
});

var MultiFaceSchema = new mongoose.Schema({
  artist: String,
  color_indicator: { type: [String], default: undefined },
  colors: { type: [String], default: undefined }, // if empty [] === colorless else (null or missing) === not pertinent
  flavor_text: String,
  illustration_id: mongoose.ObjectId,
  image_uris: ImageLinkSchema,
  loyalty: String,
  mana_cost: { type: String, required: true },
  name: { type: String, required: true },
  object: { type: String, required: true },
  oracle_text: String,
  power: String,
  printed_name: String,
  printed_type_line: String,
  toughness: String,
  type_line: { type: String, required: true },
  watermark: String
});

var RelatedCardsSchema = new mongoose.Schema({
  id: { type: mongoose.ObjectId, required: true },
  object: { type: String, required: true },
  component: { type: String, required: true },
  name: { type: String, required: true },
  type_line: { type: String, required: true },
  uri: { type: String, required: true }
});

var CardSchema = new mongoose.Schema({
  // Core Card Fields
  arena_id: Number,
  id: { type: mongoose.ObjectId, required: true },
  lang: { type: String, required: true },
  mtgo_id: Number,
  mtgo_foil_id: Number,
  multiverse_ids: { type: [Number], default: undefined },
  tcgplayer_id: Number,
  object: { type: String, required: true },
  oracle_id: { type: mongoose.ObjectId, required: true },
  prints_search_uri: { type: String, required: true },
  rulings_uri: { type: String, required: true },
  scryfall_uri: { type: String, required: true },
  uri: { type: String, required: true },

  // Gameplay Fields
  all_parts: RelatedCardsSchema,
  card_faces: MultiFaceSchema,
  cmc: { type: Number, required: true },
  colors: { type: [String], default: undefined }, // if empty [] === colorless else (null or missing) === not pertinent
  color_identity: { type: [String], default: undefined, required: true },
  color_indicator: { type: [String], default: undefined },
  edhrec_rank: Number,
  foil: { type: Boolean, required: true },
  hand_modifier: String,
  layout: { type: String, required: true },
  legalities: { type: LegalitiesSchema, required: true },
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
  type_line: { type: Boolean, required: true },

  // Print Fields
  artist: String,
  booster: { type: Boolean, required: true },
  border_color: { type: String, required: true },
  card_back_id: { type: mongoose.ObjectId, required: true },
  collector_number: { type: String, required: true },
  digital: { type: Boolean, required: true },
  flavor_text: String,
  frame_effects: { type: [String], default: undefined },
  frame: { type: String, required: true },
  full_art: { type: Boolean, required: true },
  games: { type: [String], required: true },
  highres_image: { type: Boolean, required: true },
  illustration_id: mongoose.ObjectId,
  image_uris: ImageLinkSchema,
  preview: PreviewSchema,
  prices: { type: PricesSchema, required: true },
  printed_name: String,
  printed_text: String,
  printed_type_line: String,
  promo_types: { type: [String], default: undefined },
  purchase_uris: { type: PurchaseLinkSchema, required: true },
  rarity: { type: String, required: true },
  related_uris: { type: RelatedLinkSchema, required: true },
  released_at: { type: Date, required: true },
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

  // Card Face Objects || Minus duplicates
  color_indicator: String
});

var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function() {
  console.log("We're connected!");
  // we're connected!
});
