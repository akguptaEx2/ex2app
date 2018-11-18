# EX2 Android|iOS App

Device Management

## Getting Started

clone the project and do npm install 

### Prerequisites

nodejs 

## Running the tests

Tests are preconfigured. All the unit test files are needed to be added to test directory.
See package.json's test script to get a better picture.

### Command
npm test

### And coding style tests
Main file is server.js.
index.js in used as barrel to supply imports to server

## Database Info
database is on mysql
knex package is used to make migrations to database
please refer to knexfile.js and 'db' directory
### Knex Docs
https://knexjs.org

## Codebase Directory Structure
All client relates files will go in public directory.
public directory can be used as react or angular frontend.
All server related files will go in src directory.
All the test files will go in tests directory
There will be a separate test file (fileNameInSrc.test.js) for writing unit test cases for different files

## Authors

* **Arup Kumar Gupta** - *Initial work* - [EX2APP](https://github.com/akguptaex2/ex2app)

See also the list of [contributors](https://github.com/akguptaex2/ex2app/contributors) who participated in this project.

## License
ISC

