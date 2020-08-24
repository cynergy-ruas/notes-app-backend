const database = require('../services/database');

/**
 * Generates id of a note.
 * This function generates random numbers for now. The better way would be
 * to generate a UUID for each note.
 * 
 * @returns the note id.
 */
function generateNoteID() {
    const min = 0;
    const max = 100000;
    return Math.floor(Math.random() * (max - min)) + min;
}

/**
 * Gets the notes of user.
 * @param user_id the id of the user.
 */
exports.getNotesOfUser = async (user_id) => {
    const data = await database.getNotes(user_id);
    return data;
};

/**
 * Creates a note for the user.
 * @param user_id the id of the user.
 * @param title the title of the note.
 * @param body the body of the note.
 */
exports.createNote = async(user_id, title, body) => {
    // generate a id for the note
    const note_id = generateNoteID();

    await database.createNote(note_id, user_id, title, body);
    return note_id;
}

/**
 * Updates the note.
 * @param note_id the id of the note to update.
 * @param title the new title of the note.
 * @param body the new body of the note.
 */
exports.updateNote = async(note_id, title, body) => {
    await database.updateNote(note_id, title, body);
}

/**
 * Deletes a note.
 * @param note_id the id of the note to delete.
 */
exports.deleteNote = async(note_id) => {
    await database.deleteNote(note_id);
}