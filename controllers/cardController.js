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
  console.log(req);
  const name = new RegExp(req.name, "i");
  return await Card.find({ name: name, cmc: req.cmc });
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
