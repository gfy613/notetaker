const fs = require('fs');
const path = require('path');
const { uuid } = require('uuidv4');
let notes;
module.exports = app => {

    // Setup notes variable


        // API ROUTES
        // ========================================================
    
        // Setup the /api/notes get route
        app.get("/api/notes", function(req, res) {
            // let notes;
            fs.readFile("./db/db.json","utf-8", (err, data) => {

                if (err) throw err;
        
                notes = JSON.parse(data);
            })
            // Read the db.json file and return all saved notes as JSON.
            res.json(notes);
        });

        // Setup the /api/notes post route
        app.post("/api/notes", function(req, res) {
            // Receives a new note, adds it to db.json, then returns the new note
            let newNote = req.body;
            notes.push({...newNote, id: uuid()})
            updateDb();
            res.json(notes);
         
        });

        // Retrieves a note with specific id
        app.get("/api/notes", function(req,res) {
            // display json for the notes array indices of the provided id
            res.json(notes);
        });

        // Deletes a note with specific id
        app.delete("/api/notes/:id", function(req, res) {
console.log(req.params.id)
            let dataId = req.params.id;
            let newData = fs.readFileSync("./db/db.json","utf-8")
            console.log("newdata:"+newData)
            let newDataParse = JSON.parse(newData)
            console.log("newdataparse"+newDataParse)
            let newArr = newDataParse.filter(function(item){
                return item.id != dataId
            })

            console.log("newarr"+newArr)

            fs.writeFile("./db/db.json",JSON.stringify(newArr),function(err){
            if(err) throw err;
        
             } )

             res.json()
        });

        // VIEW ROUTES
        // ========================================================

        // Display notes.html when /notes is accessed
        app.get('/notes', function(req,res) {
            res.sendFile(path.join(__dirname, "../public/notes.html"));
        });
        
        // Display index.html when all other routes are accessed
        app.get('*', function(req,res) {
            res.sendFile(path.join(__dirname, "../public/index.html"));
        });

        //updates the json file whenever a note is added or deleted
        function updateDb() {
            fs.writeFile("db/db.json",JSON.stringify(notes,'\t'),err => {
                if (err) throw err;
                return true;
            });
        }


}