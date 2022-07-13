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

## Documentation :books:

- Feel free to download or fork this code.
- `npm i` (install dependencies)
- `npm run start` (runs the server with nodemon)
- visit `http://localhost:3000/api/v1/cats` to view the api
- Try making a GET request to this endpoint using a tool such as [Insomnia](https://insomnia.rest/) or [Postman](https://www.postman.com/). I'm a fan of Insomnia for personal projects as it's super easy to use.
- Once running locally, you'll also see a link to the docs in the terminal: ```http://localhost:3000/api/v1/docs```

