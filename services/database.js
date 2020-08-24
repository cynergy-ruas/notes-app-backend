const { Client } = require('pg');

// defining database connection configuration based on whether 
// it is a dev environment or production environemtn
let config = {};
// if its a dev environment
if (process.env.DATABASE_URL === undefined) {
    config = {
        user: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
    }
}
// else if it is a production (heroku) environment
else {
    config = {
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false
        }
    }
}
// creating client object and connecting to it
const client = new Client(config);
client.connect();

/**
 * Gets the notes of a user.
 * @param user_id the id of the user.
 */
exports.getNotes = async (user_id) => {
    const res = await client.query(`SELECT * FROM notes WHERE user_id=${user_id};`);
    return res.rows;
}

/**
 * Creates a note entry in the database.
 * @param note_id the id of the note.
 * @param user_id the id of the user creating the note.
 * @param title the title of the note.
 * @param body the body of the note.
 */
exports.createNote = async(note_id, user_id, title, body) => {
    await client.query(
        `INSERT INTO notes (note_id, title, body, user_id) VALUES (${note_id}, '${title}', '${body}', ${user_id});`
    );
}

/**
 * Updates a note.
 * @param note_id id of the note to update.
 * @param title the new title of the note.
 * @param body the new body of the note.
 */
exports.updateNote = async(note_id, title, body) => {
    await client.query(
        `UPDATE notes SET title='${title}', body='${body}' WHERE note_id=${note_id}`
    );
}

/**
 * Deletes a note.
 * @param note_id id of the note to delete
 */
exports.deleteNote = async(note_id) => {
    await client.query(
        `DELETE FROM notes WHERE note_id=${note_id}`
    );
}