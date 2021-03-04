const express = require("express");
const OpenApiValidator = require("express-openapi-validator");

const app = new express();

app.use(
  OpenApiValidator.middleware({
    apiSpec: "./index.json",
    validateRequests: true, // (default)
    validateResponses: true, // false by default
  })
);

app.listen(3333, () => {
  console.log(`Example app listening at http://localhost:3333`);
});
