const fs = require("fs");
const notesData = require("../db/db.json");

module.exports = function(app){

    //function to add notes to DB in proper format   
    function addToDB(notes){
        notes = JSON.stringify(notes);
        fs.writeFileSync("./db/db.json", notes, function(err){
            if (err) {
                return console.log(err);
            }
        });
    }
   
    // GET Method 
    app.get("/api/notes", function(req, res){
        res.json(notesData);
    });

    // POST Method 
    app.post("/api/notes", function(req, res){
        if (notesData.length == 0){
            req.body.id = "0";
        } else{
            req.body.id = JSON.stringify(JSON.parse(notesData[notesData.length - 1].id) + 1);
        }
        notesData.push(req.body);
        addToDB(notesData);
        res.json(req.body);
    });

    // DELETE Method 
    app.delete("/api/notes/:id", function(req, res){
        let id = req.params.id.toString();
        for (i=0; i < notesData.length; i++){
            if (notesData[i].id == id){
                res.send(notesData[i]);
                notesData.splice(i,1);
                break;
            }
        }
            addToDB(notesData);
        });
};

