# af-relations-manager

Code test for ÅF. Built in Node.js, TypeScript & React.

## Start application in local environment

```
git clone https://github.com/MikaelEdebro/af-relations-manager.git

cd ar-relations-manager

npm install && npm run dev
```

To run tests:

```
npm test
```

Make sure your version of Node.js is up to date. `node -v`. There might be some issues installing packages with old version of Node. I'm using Node 10.9.0.
It should open a browser window with http://localhost:3000

## About the app

**Backend**

- Located in `/server` directory.
- Written in Node.js and TypeScript.
- Uses MongoDB as storage, and Mongoose as an ORM. Db is hosted on my MLab account to avoid needing to install MongoDb locally.
- I've added "integration tests" for the controllers. Test suite is not complete due to time limits.

**Front-end**

- Located in `/client` directory
- Written in React & TypeScript

## Possible improvements

- More complete test suite.
- Better validation for both backend & frontend
- Error handling. Currently async/await implementation does not handle errors gracefully. Create Express middleware to catch any errors.
