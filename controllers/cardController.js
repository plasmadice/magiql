const Card = require("../models/Card");
const DataLoader = require("dataloader");

const cardLoader = new DataLoader(key => {
  return this.getCard(key);
});

const batchCardLoader = new DataLoader(keys => {});

// Get All Cards ... maybe don't use this
exports.getAllCards = async () => {
  try {
    const cards = await Card.find();
    return cards;
  } catch (err) {
    throw boom.boomify(err);
  }
};

// Get single Card by ID
exports.getCard = async req => {
  try {
    const id = req.params === undefined ? req.id : req.params.id; // example with REST using routes
    const card = await Card.findById(id);
    return card;
  } catch (err) {
    throw boom.boomify(err);
  }
};

// TODO:  will be remedied by indexing .id
exports.getCard = async req => {
  return await Card.findOne({ id: req.id });
};

exports.getCardsByName = async req => {
  const cardName = req.params === undefined ? req.name : req.params.name; // example with REST using routes
  const re = new RegExp(cardName, "i");
  return await Card.find({ name: re });
};

//field: name => req.name { name: "Jane" }
