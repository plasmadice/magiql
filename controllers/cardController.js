const boom = require("@hapi/boom");
const Card = require("../models/Card");

// Get All Cards ... maybe don't use this
exports.getCards = async () => {
  try {
    const cards = await Card.find();
    return cards;
  } catch (err) {
    throw boom.boomify(err);
  }
};

// Get single Card by ID
exports.getCardById = async req => {
  try {
    const id = req.params === undefined ? req.i : req.params.id;
    const card = await Card.findById(id);
    return card;
  } catch (err) {
    throw boom.boomify(err);
  }
};

exports.getCardByScryfallId = async req => {
  try {
    const id = req.params === undefined ? req.id : req.params.id;
    const card = await Card.findOne({ id: id });
    return card;
  } catch (err) {
    throw boom.boomify(err);
  }
};

exports.getCardsByName = async req => {
  try {
    const cardName = req.params === undefined ? req.name : req.params.name;
    const re = new RegExp(cardName, "i");
    const cards = await Card.find({ name: re });
    return cards;
  } catch (err) {
    throw boom.boomify(err);
  }
};
