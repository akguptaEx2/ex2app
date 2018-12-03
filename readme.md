# EX2 Android|iOS App

Device Management

## Getting Started

clone the project and do npm install 

### Prerequisites

nodejs 

## Environment configuration
For development purposes only the config directory is include for the time being.<br/>
It is added to .gitignore though and will remove from the repository as well after development is started.<br/>
Developers must not commit config files.<br/>
There are 3 databases that are needed to be maintained -> dev (ex2app_dev) test(ex2app_test) and  production (ex2app).<br/>
With the config file the credentials and databases  are set automatically depending upon the environment variable currently in use. Please refer to config/config.json,db/index.js and package.json for better reference.

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
sequelize is used as orm for mysql.
For reference purposes ex2app database is created in mysql

### Sequelize Docs
http://docs.sequelizejs.com/

## Codebase Directory Structure
All client relates files will go in public directory.<br/>
public directory can be used as react or angular frontend.<br/>
All server related files will go in src directory.<br/>
All the test files will go in tests directory.<br/>
There will be a separate test file (fileNameInSrc.test.js) for writing unit test cases for different files.<br>
After cloning the repo
run the following command <br>
```

git update-index --assume-unchanged src/config/config.json
```
## Setup Database
Setup database as per config.json <br>
The config.json can be modified as per need. It won't be committed though
sync the database. You can do it by starting the server once.
You need to have sequelize-cli installed globally to run the above command
```
npm i -g sequelize-cli
cd src/
sequelize db:migrate
```
## Create Super Admin 
```
npm run superadmin
```
## Authors

* **Arup Kumar Gupta** - *Initial work* - [EX2APP](https://github.com/akguptaex2/ex2app)

See also the list of [contributors](https://github.com/akguptaex2/ex2app/contributors) who participated in this project.

## License
ISC

