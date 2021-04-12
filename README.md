# express-openapi-validator-issue-2

Workflow:

1. run `node index`
2. `curl -sS http://localhost:3333/clusters`
3. Expected response validation error.

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

```
{
  "message": "Cannot read property 'content' of undefined"
}
```

This will NOT fail - will reponse with proper error message for validation:

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

```
{
  "message": ".response should be array",
  "errors": [{
    "path": ".response",
    "message": "should be array",
    "errorCode": "type.openapi.validation"
  }]
}
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
