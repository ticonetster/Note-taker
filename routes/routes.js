const fs = require('fs');
const path = require('path');
const uuid = require('../helpers/uuid');

  const app = (app) =>{
    // Read json and store data in var notes
    fs.readFile("./db/db.json","utf8", (err, data) => {
        if (err) throw err;
        var notes = JSON.parse(data);
        
        /// API GET routes ///
        //All notes route
        app.get("/api/notes", (req, res) => {
            //All notes
            res.json(notes);
        });
        //Notes with ID
        app.get("/api/notes/:id", (req,res) => {
            //Note matching the id
            res.json(notes[req.params.id]);
        });

        ///API POST routes ///
        //POST a note route
        app.post("/api/notes", (req, res) => {
            // add new note to the local var, then run function to update json with said var
            //deconstruct the body and add a random id
            let {title, text} = req.body;
            let newNote = {
                id: uuid(),
                title,
                text,
            };
            notes.push(newNote);
            updateDb();
            //Added a response to trigger the wait
            let response = {
                status: 'success',
                body: newNote,
            };
            res.status(201).json(response);
            return console.log(`New note added: ${newNote.title}`);
        });

        // Deletes a note with specific id
        app.delete("/api/notes/:id", (req, res) => {
            notes.splice(req.params.id, 1);
            updateDb();
            //Added a response to trigger the wait
            let response = {
                status: 'success',
                body: req.params.title,
            };
            res.status(201).json(response);
            console.log(`New note deleted: ${req.params.id}`);
        });

        // GET notes site route
        app.get('/notes', (req,res) => {
            res.sendFile(path.join(__dirname, "../public/notes.html"));
        });
        
        // Default route
        app.get('*', (req,res) => {
            res.sendFile(path.join(__dirname, "../public/index.html"));
        });

        //updates the json file whenever a note is added or deleted
        function updateDb(){
            fs.writeFile("db/db.json",JSON.stringify(notes,'\t'),err => {
                if (err) throw err;
                return true;
            });
        }
    });
};
module.exports = app;