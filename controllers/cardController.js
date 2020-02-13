const Card = require("../models/Card");
// const DataLoader = require("dataloader");

// const cardLoader = new DataLoader(key => {
//   return this.getCard(key);
// });

// const batchCardLoader = new DataLoader(keys => {});

// Get All Cards ... maybe don't use this
const getAllCards = async () => {
  return await Card.find();
};

// TODO:  will be remedied by indexing .id
// Get single Card by ID
const getCard = async req => {
  return await Card.findOne({ id: req.id });
};

const getCards = async req => {
  // clones arguments and formats them into query
  let query = { ...req };

  // name
  if (req.name) query.name = new RegExp(req.name, "i");

  // cmc min and max
  let cmcQuery = {};
  if (req.cmcMin) {
    cmcQuery.$gte = req.cmcMin;
    delete query.cmcMin;
  }
  if (req.cmcMax) {
    cmcQuery.$lte = req.cmcMax;
    delete query.cmcMax;
  }
  if (Object.keys(cmcQuery).length) query.cmc = cmcQuery;

  // power min and max
  let powerQuery = {};
  if (req.powerMin) {
    powerQuery.$gte = req.powerMin;
    delete query.powerMin;
  }
  if (req.powerMax) {
    powerQuery.$lte = req.powerMax;
    delete query.powerMax;
  }
  if (Object.keys(powerQuery).length) query.power = powerQuery;

  // toughness min and max
  let toughnessQuery = {};
  if (req.toughnessMin) {
    toughnessQuery.$gte = req.toughnessMin;
    delete query.toughnessMin;
  }
  if (req.toughnessMax) {
    toughnessQuery.$lte = req.toughnessMax;
    delete query.toughnessMax;
  }
  if (Object.keys(toughnessQuery).length) query.toughness = toughnessQuery;

  // legalities
  if (query.legalities) {
    query[`legalities.${req.legalities}`] = "legal";
    delete query.legalities;
  }

  // Type TODO: make better regex
  if (query.type_line) query.type_line = new RegExp(req.type_line, "i");

  // Oracle Text
  if (query.oracle_text) query.oracle_text = new RegExp(req.oracle_text, "i");

  // Colors TODO: Re-add database (colors are now pre-sorted)
  if (query.colors) query.colors = query.colors.sort();

  // Color Identity TODO: Re-add database (color_identity are now pre-sorted)
  if (query.color_identity) query.color_identity = query.color_identity.sort();

  // Set
  if (query.set) query.set = new RegExp(query.set, "i");

  // delete query.legalities;
  return await Card.find(query);
};

const getCardsByName = async req => {
  const cardName = req.params === undefined ? req.name : req.params.name; // example with REST using routes
  const re = new RegExp(cardName, "i");
  return await Card.find({ name: re });
};

//field: name => req.name { name: "Jane" }
module.exports = {
  getAllCards,
  getCard,
  getCards,
  getCardsByName
};
