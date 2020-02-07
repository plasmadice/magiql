console.time("start");
var mongoose = require("mongoose");
require("dotenv").config();
const DB_CONNECT = process.env.DB_CONNECT;
var schemas = require("./schemas");

// const data = require("./scryfall-default-cards.json");

// const readyData = data.map(item => {
//   item.json = JSON.stringify(item);
//   return item;
// });

mongoose.connect(DB_CONNECT, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

var legalitiesSchema = new mongoose.Schema({
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

var imageLinkSchema = new mongoose.Schema({
  small: String,
  normal: String,
  large: String,
  art_crop: String,
  border_crop: String,
  png: String
});

var pricesSchema = new mongoose.Schema({
  usd: String,
  usd_foil: String,
  eur: String,
  tix: String
});

var purchaseLinkSchema = new mongoose.Schema({
  tcgplayer: String,
  cardmarket: String,
  cardhoarder: String
});

var relatedLinkSchema = new mongoose.Schema({
  gatherer: String,
  tcgplayer_decks: String,
  edhrec: String,
  mtgtop8: String
});

var previewSchema = new mongoose.Schema({
  source: String,
  source_uri: String,
  previewed_at: String
});

var multiFaceSchema = new mongoose.Schema({
  artist: String,
  color_indicator: { type: [String], default: undefined },
  colors: { type: [String], default: undefined }, // if empty [] === colorless else (null or missing) === not pertinent
  flavor_text: String,
  illustration_id: String,
  image_uris: imageLinkSchema,
  loyalty: String,
  mana_cost: String,
  name: String,
  object: String,
  oracle_text: String,
  power: String,
  printed_name: String,
  printed_type_line: String,
  toughness: String,
  type_line: String,
  watermark: String
});

var relatedCardsSchema = new mongoose.Schema({
  id: { type: String, required: true },
  object: { type: String, required: true },
  component: { type: String, required: true },
  name: { type: String, required: true },
  type_line: { type: String, required: true },
  uri: { type: String, required: true }
});

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
  all_parts: [relatedCardsSchema],
  card_faces: [multiFaceSchema],
  cmc: { type: Number, required: true },
  colors: { type: [String], default: undefined }, // if empty [] === colorless else (null or missing) === not pertinent
  color_identity: { type: [String], default: undefined, required: true },
  color_indicator: { type: [String], default: undefined },
  edhrec_rank: Number,
  foil: { type: Boolean, required: true },
  hand_modifier: String,
  layout: { type: String, required: true },
  legalities: { type: legalitiesSchema, required: true },
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
  image_uris: imageLinkSchema,
  preview: previewSchema,
  prices: pricesSchema,
  printed_name: String,
  printed_text: String,
  printed_type_line: String,
  promo_types: { type: [String], default: undefined },
  purchase_uris: purchaseLinkSchema,
  rarity: { type: String, required: true },
  related_uris: { type: relatedLinkSchema, required: true },
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

var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function() {
  console.log("Connected to MongoDB server");
  // we're connected!
});

var Card = mongoose.model("Card", cardSchema);

// Card.insertMany(readyData, (err, documents) => {
//   if (err) console.error(err);
//   console.log("Operation complete");
//   console.timeLog("start");
// });

// Card.find({ name: /hi/i }, (err, doc) => {
//   console.log(doc.length);
//   console.timeLog("start");
// });
