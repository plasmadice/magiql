const fastify = require('fastify')({
  logger: true
});
const mongoose = require('mongoose')
const dotenv = require('dotenv').config();

mongoose
	.connect(process.env.DB_Connect);
	.then(() => console.log('MongoDB connected...'))
	.catch(err => console.log(err))

module.exports = fastify