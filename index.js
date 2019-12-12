const express = require("express");
const graphqlHTTP = require("express-graphql");
const schema = require("./schema");
const mongoose = require("mongoose");

const app = express();

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true
  })
);

mongoose
  .connect("mongodb://localhost:27017", { useNewUrlParser: true })
  .then(console.log("connected"));

app.listen(5000, () => {
  console.log("listening on port 5k");
});
