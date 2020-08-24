# Notes app backend
The backend for the notes app created for demonstration.

## Development Setup
Make sure postgresql is installed on your local machine. Then clone the repo and run
```
$ npm install
```

to install the dependencies.

Make a file called `.env-dev` in the root folder which contain the postgres database name, user and password, along with the port the app should listen to. for example,
```
DATABASE_USER=app
DATABASE_PASSWORD=123456
DATABASE_NAME=cynergy_notes
PORT=8000
```

To run the development setup, run
```
$ npm run start-dev
```