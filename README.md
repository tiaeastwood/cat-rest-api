# A Test REST API (with cats! :cat:)

An example of a REST API. This gives examples of folder structure, how to set up the routes, controllers, services etc. The data is provided by a json file, but ideally you would link it up to a database for production. Feel free to use this as an example of how to build your own REST API!

## Technology :computer:

- JavaScript
- Node
- Nodemon
- Express
- body-parser
- uuid

---

## The Parts of the API

If you're new to building APIs or just need a refresher, here is what all the parts are and what they do:

### :cat: Routes (catRoutes.js)

The routes file is where you set out your endpoints for you API. You would also add a method (GET, POST, Patch or DELETE) to each endpoint which sets up what action can be taken on that endpoint.

### :cat: Controllers (catController.js)

Controllers handle the data fetching, using HTTP requests (req) and responses (res).

### :cat: Service (catService.js)

The service layer exports methods which are used by the controller.

### :cat: Data Access Layer (cat.js)

A collection of methods that handles the database interaction.

### :cat: Database (db.json)

Where the data is stored. Here I'm using a mock database in the form of a json file.

---

## Versioning :arrow_forward:

- It is good practice to version your API; it's easier for you to manage and easier for your users to avoid breaking changes.
- You can work on the next version of your API without affecting anyone still using the previous one.
- Keep each version available, so your users can upgrade to the next one when they are ready.
- Current and new versions run parallel and don't affect each other.
- In the index.js file, you can see the version in the endpoint: `"/api/v1/cats"`
- I have created a **v1** folder within the **src** folder to contain everything specific to this version of the API (routes, controllers and services) as these are the things I will probably make changes to with each version of the API.

---

## How to run :rocket:

- Feel free to download or fork this code.
- `npm i` (install dependencies)
- `npm run dev` (runs the server with nodemon)
- visit `http://localhost:3000/api/v1/cats` to view the api
- Try making a GET request to this endpoint using a tool such as [Insomnia](https://insomnia.rest/) or [Postman](https://www.postman.com/). I'm a fan of Insomnia for personal projects as it's super easy to use.
- Once running locally, you'll also see a link to the docs in the terminal: ```http://localhost:3000/api/v1/docs```

---
## Documentation :books:
- I created my API documentation using [Swagger](https://swagger.io/).
It can seem complicated to understand at first, but you can check out the way I've structured mine to help you get started.
- I created a **swagger.js** file which contains the code to get Swagger up and running on your project.

```js
// swagger.js

// In src/v1/swagger.js
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

// Basic Meta Informations about our API
const options = {
  definition: {
    openapi: "3.0.0",
    info: { title: "Cat API", version: "1.0.0" },
  },
  apis: ["./src/v1/documentation/doc.yml"],
};

// Docs in JSON format
const swaggerSpec = swaggerJSDoc(options);

// Function to setup our docs
const swaggerDocs = (app, port) => {
  // Route-Handler to visit our docs
  app.use("/api/v1/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  // Make our docs in JSON format available
  app.get("/api/v1/docs.json", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });
  console.log(
    `Version 1 Docs are available on http://localhost:${port}/api/v1/docs`
  );
};

module.exports = { swaggerDocs };
```

- I then created a folder called **documentation** and inside I created a ***doc.yml*** file ( you don't have to call it this, you call it anything). You need to make sure you link this yml file in your swagger.js file.
- The yml file contains the information to explain how the [CRUD operations](https://www.freecodecamp.org/news/crud-operations-explained/) on the endpoints work and what the schema looks like:

```yml

openapi: "3.0.2"
info:
  title: Cat API
  version: "1.0"
paths:
  /api/v1/cats:
    get:
      tags:
        - cats
      summary: Get all cats
      responses:
        "200":
          description: "OK"
        "404":
          description: Cats not found
        "5XX":
          description: Failed
    post:
      tags:
        - cats
      summary: Post a new cat
      requestBody:
        description: Add a new cat
        required: true
        content:
          application/json:
            schema:
              $ref: "#/components/schemas/Cat"
      responses:
        "201":
          description: "Created"
        "5XX":
          description: Failed
          content:
            application/json:
              schema:
                type: object
                properties:
                  status:
                    type: string
                    example: FAILED
                  data:
                    type: object
                    properties:
                      error:
                        type: string
                        example: "Some error message"
  /api/v1/cats/{catId}:
    get:
      tags:
        - cats
      summary: Get a cat by ID
      description: Returns a single cat
      parameters:
        - name: catId
          in: path
          description: catId to return
          required: true
          type: string
      responses:
        "200":
          description: successful operation
        "404":
          description: Cat not found
        "5XX":
          description: Failed
          content:
            application/json:
              schema:
                type: object
                properties:
                  status:
                    type: string
                    example: FAILED
                  data:
                    type: object
                    properties:
                      error:
                        type: string
                        example: "Some error message"
    delete:
      tags:
        - cats
      summary: Delete a cat by ID
      description: Delete a single cat"
      parameters:
        - name: catId
          in: path
          description: catId to delete
          required: true
          type: string
      responses:
        "204":
          description: Deleted
        "400":
          description: Invalid ID supplied
        "404":
          description: Cat with that ID not found
        "5XX":
          description: FAILED
          content:
            application/json:
              schema:
                type: object
                properties:
                  status:
                    type: string
                    example: FAILED
                  data:
                    type: object
                    properties:
                      error:
                        type: string
                        example: "Some error message"

components:
  schemas:
    Cat:
      type: object
      properties:
        id:
          type: string
          example: "61dbae02-c147-4e28-863c-db7bd402b2d6"
        name:
          type: string
          example: "Lucky"
        sex:
          type: string
          example: "Male"
        age:
          type: number
          example: 2
        breed:
          type: string
          example: "Bengal"
        colour:
          type: string
          example: "Brown"
        likes:
          type: array
          items:
            type: string
            example: ["chicken", "going outside"]
        createdAt:
          type: string
          example: "4/20/2022, 2:21:56 PM"
        updatedAt:
          type: string
          example: "4/20/2022, 2:21:56 PM"
    NewCat:
      type: object
      properties:
        name:
          type: string
          example: "Lucky"
        sex:
          type: string
          example: "Male"
        age:
          type: number
          example: 7
        breed:
          type: string
          example: "Unknown"
        colour:
          type: string
          example: "Black"
        likes:
          type: array
          items:
            type: string
            example: ["mice", "scratching the sofa"]


```


- I highly recommend checking out the [official documentation](https://swagger.io/) for Swagger to learn more.

---

## Useful Links :bulb:
- [Swagger](https://swagger.io/)
- [Swagger Editor](https://editor.swagger.io/)
- [How to split a Swagger spec into smaller files](https://azimi.me/2015/07/16/split-swagger-into-smaller-files.html)

