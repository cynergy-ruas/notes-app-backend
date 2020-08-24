const notes_controller = require("../controller/notes");

module.exports = (router) => {
    // getting notes of user
    router.get("/", async (req, res) => {
        const user_id = req.query.user_id;
    
        const data = await notes_controller.getNotesOfUser(user_id);
        if (data === undefined)
            return res.status(404).json({
                message: `user with id ${user_id} not found`
            });
        
        return res.status(200).json(data);
    });
    
    // creating a note
    router.post("/", async (req, res) => {
        const { user_id, title, body } = req.body;
    
        try{
            const note_id = await notes_controller.createNote(user_id, title, body);
            return res.status(200).json({
                success: true,
                note_id: note_id
            });
        }
        catch(e) {
            console.log(e);
            return res.status(500).send({
                message: `error occurred: ${e}`
            });
        }
        
    });
    
    // updating a note
    router.put("/", async (req, res) => {
        const { note_id, title, body } = req.body;
    
        try{
            await notes_controller.updateNote(note_id, title, body);
            return res.status(200).json({
                success: true,
                note_id: note_id
            });
        }
        catch(e) {
            console.log(e);
            return res.status(500).send({
                message: `error occurred: ${e}`
            });
        }
    });
    
    // deleting a note
    router.delete("/", async (req, res) => {
        const note_id = req.query.note_id;
    
        try{
            await notes_controller.deleteNote(note_id);
            return res.status(200).json({
                success: true,
                note_id: note_id
            });
        }
        catch(e) {
            console.log(e);
            return res.status(500).send({
                message: `error occurred: ${e}`
            });
        }
    });

    return router;
}