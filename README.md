# express-openapi-validator-res-issue

Workflow:

1. run `node index`
2. see error

---

It happens only if you have multiple responses (see `path/clusters.yaml` and `path/users.yaml`) referencing same file in multiple paths.

eg.

```
clusters > 200, 400
users > 200, 400
# 400 must reference the same response
```

---

Having:

```yaml
get:
  tags:
    - Users
  description: Returns a list of users
  operationId: getUsers
  responses:
    "200":
      $ref: "../responses/users.yaml"
    "400":
      $ref: "../responses/400.yaml"
```

This will fail:

```yaml
get:
  tags:
    - Clusters
  description: Returns a list of clusters
  operationId: getClusters
  responses:
    "200":
      $ref: "../responses/clusters.yaml"
    "400":
      $ref: "../responses/400.yaml"
```

This will NOT fail:

```yaml
get:
  tags:
    - Clusters
  description: Returns a list of clusters
  operationId: getClusters
  responses:
    "200":
      $ref: "../responses/clusters.yaml"
```

It will not fail, if you reference response only once:

```
clusters > 200, 400
users > 200
```

or

```
clusters > 200
users > 200, 400
```

---

`npm run test` to validate spec file

`npm run yaml2json` to create json from spec

---

Issue:

```
crudo@bee > node index

Example app listening at http://localhost:3333
/Users/XXX/Sites/git/express-openapi-validator-res-issue/node_modules/express-openapi-validator/dist/middlewares/parsers/schema.preprocessor.js:294
if (rschema.content) {
^

TypeError: Cannot read property 'content' of undefined
at SchemaPreprocessor.extractResponseSchemaNodes (/Users/XXX/Sites/git/express-openapi-validator-res-issue/node_modules/express-openapi-validator/dist/middlewares/parsers/schema.preprocessor.js:294:25)
at SchemaPreprocessor.gatherSchemaNodesFromPaths (/Users/XXX/Sites/git/express-openapi-validator-res-issue/node_modules/express-openapi-validator/dist/middlewares/parsers/schema.preprocessor.js:87:49)
at SchemaPreprocessor.preProcess (/Users/XXX/Sites/git/express-openapi-validator-res-issue/node_modules/express-openapi-validator/dist/middlewares/parsers/schema.preprocessor.js:46:24)
at /Users/XXX/Sites/git/express-openapi-validator-res-issue/node_modules/express-openapi-validator/dist/openapi.validator.js:83:95
```
