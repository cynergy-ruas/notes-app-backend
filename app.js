// importing stuff
const express = require('express');
const gen_note_routes = require('./routes/note_routes');

// creating the express app
const app = express();

// creating a router
const note_router = express.Router();

// using express.json middleware to parse json body in requests
app.use(express.json());

// adding router containing API endpoints related to notes
// and prefixing the endpoints with /api/v1/notes
app.use('/api/v1/notes', gen_note_routes(note_router));

// starting the server
app.listen(process.env.PORT, () => console.log(`app listening on port ${process.env.PORT}`));
