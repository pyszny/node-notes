const fs = require('fs');

let fetchNotes = () => {
    //checking if any notes exist
    //try to run lines below. When these two lines will fail, program will continue its work
    try {
        let notesString = fs.readFileSync('notes-data.json');
        return JSON.parse(notesString);
    } catch (e) {                                                   //catch error
        return [];
    }
};

let saveNotes = (notes) => {
    fs.writeFileSync('notes-data.json', JSON.stringify(notes));     //save in json file
};

const addNote = (title, body) => {
    let notes = fetchNotes();
    let note = {                                                    //create note object with arguments
        title,
        body
    };

    //if note.title === title, function will return true, and note will appear in array duplicateNotes
    let duplicateNotes = notes.filter((note) => note.title === title);

    if(duplicateNotes.length === 0) {                               //if note title is unique
        notes.push(note);                                           //push note in array
        saveNotes(notes);
        return note;
    }


};

const getAll = () => {
    return fetchNotes();
};

const getNote = (title) => {
    let notes = fetchNotes();
    let noteToRead = notes.filter((note) => note.title === title);      //returns array
    return noteToRead[0];                                               //so i need to return first item
};

const removeNote = (title) => {
    let notes = fetchNotes();
    //note will be saved in array, if note.title !== title
    let filteredNotes = notes.filter((note) => note.title !== title);
    saveNotes(filteredNotes);

    return notes.length !== filteredNotes.length;
};

const logNote = (note) => {
    console.log('--');
    console.log(`Title: ${note.title}`);
    console.log(`Body: ${note.body}`);
};

module.exports = {           //exports above functions to appa.js file so they can be used
  addNote,                   //points to const addNote (same as addNote: addNote;)
  getAll,
  getNote,
  removeNote,
  logNote
};