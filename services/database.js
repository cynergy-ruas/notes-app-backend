const { Client } = require('pg');

let config = {};
if (process.env.DATABASE_URL === undefined) {
    config = {
        user: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
    }
}
else {
    config = {
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false
        }
    }
}
const client = new Client(config);
client.connect();

exports.getNotes = async (user_id) => {
    const res = await client.query(`SELECT * FROM notes WHERE user_id=${user_id};`);
    return res.rows;
}

exports.createNote = async(note_id, user_id, title, body) => {
    await client.query(
        `INSERT INTO notes (note_id, title, body, user_id) VALUES (${note_id}, '${title}', '${body}', ${user_id});`
    );
}

exports.updateNote = async(note_id, title, body) => {
    await client.query(
        `UPDATE notes SET title='${title}', body='${body}' WHERE note_id=${note_id}`
    );
}

exports.deleteNote = async(note_id) => {
    await client.query(
        `DELETE FROM notes WHERE note_id=${note_id}`
    );
}