# API of the evaluation tool

RESTful API used by [A Tool to Monitor and Evaluate Students' Performance](https://github.com/dov11/evaluation-tool).

Uses Express server; Passport.js for authentication purposes.

## Running Locally
1. Make sure you have [node(8.x)](https://nodejs.org/en/), [MongoDB](https://www.mongodb.com/) and either [npm](https://www.npmjs.com/) and/or [yarn](https://yarnpkg.com/en/) installed
2. 
```bash
git clone git@github.com:dov11/evaluation-api.git
cd evaluation-api
yarn install
```
3. In order to create a user with credentials found in the /db/fixtures/user.json file run
```bash
yarn seed
```

## Possible future functionality
Addition of administrative roles/ability to sign-up

## Additional info
More information about the application can be found [here](https://github.com/dov11/evaluation-tool).
