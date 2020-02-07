// Import Server
const fastify = require("./server.js");

// Import external dependancies
const GQL = require("fastify-gql");

// Import GraphQL Schema
const schema = require("./graphql_schema");

// Register Fastify GraphQL
fastify.register(GQL, {
  schema: schema,
  graphiql: true
});

// Import Routes
// const routes = require("./routes");

// Import Swagger Options
const swagger = require("./config/swagger");
// Register Swagger
fastify.register(require("fastify-swagger"), swagger.options);

// Loop over each route
// const route = {
//   method: "GET",
//   url: "/",
//   handler: () => console.log("goofed")
// };

// fastify.route(route);

const start = async () => {
  try {
    await fastify.listen(3000, "127.0.0.1");
    fastify.swagger();
    fastify.log.info(`server listening on ${fastify.server.address().port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
