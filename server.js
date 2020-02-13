const Fastify = require("fastify");
const fastify = Fastify();
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

mongoose
  .connect(process.env.DB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("MongoDB connected..."))
  .catch(err => console.log(err));

module.exports = fastify;
