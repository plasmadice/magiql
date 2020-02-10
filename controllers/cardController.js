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
    const id = req.params === undefined ? req.id : req.params.id; // example with REST using routes
    const card = await Card.findById(id);
    return card;
  } catch (err) {
    throw boom.boomify(err);
  }
};

exports.getCardById = async req => {
  try {
    const id = req.id === undefined ? req._id : req.id; // example with REST using routes
    const card = await Card.findOne({ id: id });
    return card;
  } catch (err) {
    throw boom.boomify(err);
  }
};

exports.getCardsByName = async req => {
  try {
    const cardName = req.params === undefined ? req.name : req.params.name; // example with REST using routes
    const re = new RegExp(cardName, "i");
    const cards = await Card.find({ name: re });
    return cards;
  } catch (err) {
    throw boom.boomify(err);
  }
};

//field: name => req.name { name: "Jane" }
