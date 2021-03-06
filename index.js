const express = require("express");
const OpenApiValidator = require("express-openapi-validator");

const app = new express();

app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: false }));

app.use(
  OpenApiValidator.middleware({
    apiSpec: "./index.yaml",
    validateRequests: true,
    validateResponses: true,
  })
);

app.get("/clusters", (req, res) => {
  // should be array, not { data: ARRAY }
  const data = { data: [{ cluster_name: "Alpha" }, { cluster_name: "Beta" }] };
  res.json(data);
});

app.use((err, req, res, next) => {
  // format error
  res.status(err.status || 500).json({
    message: err.message,
    errors: err.errors,
  });
});

app.listen(3333, () => {
  console.log(`\nExample app listening at http://localhost:3333`);
});
