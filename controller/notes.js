const database = require('../services/database');

function generateNoteID() {
    const min = 0;
    const max = 100000;
    return Math.floor(Math.random() * (max - min)) + min;
}


exports.getNotesOfUser = async (user_id) => {
    const data = await database.getNotes(user_id);
    return data;
};

exports.createNote = async(user_id, title, body) => {
    const note_id = generateNoteID();
    await database.createNote(note_id, user_id, title, body);
    return note_id;
}

exports.updateNote = async(note_id, title, body) => {
    await database.updateNote(note_id, title, body);
}

exports.deleteNote = async(note_id) => {
    await database.deleteNote(note_id);
}