const express = require('express');
const gen_note_routes = require('./routes/note_routes');

const app = express();
const note_router = express.Router();

app.use(express.json());
app.use('/api/v1/notes', gen_note_routes(note_router));


app.listen(process.env.PORT, () => console.log(`app listening on port ${process.env.PORT}`));
