const Card = require("../models/Card");
const DataLoader = require("dataloader");

const cardLoader = new DataLoader(key => {
  return this.getCard(key);
});

const batchCardLoader = new DataLoader(keys => {});

// Get All Cards ... maybe don't use this
const getAllCards = async () => {
  try {
    const cards = await Card.find();
    return cards;
  } catch (err) {
    throw boom.boomify(err);
  }
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

  // legalities
  if (query.legalities) {
    query[`legalities.${req.legalities}`] = "legal";
    delete query.legalities;
  }

  console.log(req.mana_cost);

  console.log(query);
  if (query.mana_cost) {
    delete query.mana_cost;
  }
  console.log(query);

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
