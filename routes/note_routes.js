const notes_controller = require("../controller/notes");

/**
 * Registers the API endpoints with the given `router`
 * @param router the express router to use for registration.
 */
module.exports = (router) => {
    // getting notes of user
    router.get("/", async (req, res) => {
        // getting the user id from the query string of the request
        const user_id = req.query.user_id;
        
        // getting the notes of the user
        const data = await notes_controller.getNotesOfUser(user_id);

        // returning the appropriate messages to the client
        if (data === undefined)
            return res.status(404).json({
                message: `user with id ${user_id} not found`
            });
        
        return res.status(200).json(data);
    });
    
    // creating a note
    router.post("/", async (req, res) => {
        // getting the user id, title and the body of the note from the 
        // requests body
        const { user_id, title, body } = req.body;
    
        try{
            // creating the note in the database
            const note_id = await notes_controller.createNote(user_id, title, body);

            // returning the newly created note's id
            return res.status(200).json({
                success: true,
                note_id: note_id
            });
        }
        catch(e) {
            // logging and returning error.
            console.log(e);
            return res.status(500).send({
                message: `error occurred: ${e}`
            });
        }
        
    });
    
    // updating a note
    router.put("/", async (req, res) => {
        // getting the note id, title and the body of the note to be
        // updated
        const { note_id, title, body } = req.body;
    
        try{
            // updating the note in the database
            await notes_controller.updateNote(note_id, title, body);

            // returning the id of the note that was updated
            return res.status(200).json({
                success: true,
                note_id: note_id
            });
        }
        catch(e) {
            // logging and returning the error.
            console.log(e);
            return res.status(500).send({
                message: `error occurred: ${e}`
            });
        }
    });
    
    // deleting a note
    router.delete("/", async (req, res) => {
        // getting the id of the note to be deleted from the query string
        // of the request
        const note_id = req.query.note_id;
    
        try{
            // deleting the note
            await notes_controller.deleteNote(note_id);

            // returning the id of the note that was deleted
            return res.status(200).json({
                success: true,
                note_id: note_id
            });
        }
        catch(e) {
            // logging and returning the error
            console.log(e);
            return res.status(500).send({
                message: `error occurred: ${e}`
            });
        }
    });

    // returning the router
    return router;
}