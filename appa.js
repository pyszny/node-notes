const fs = require('fs');                   //fs
const _ = require('lodash');                //lodash
const yargs = require('yargs');             //yargs

const notes = require('./notes.js');

const titleOptions = {
    describe: 'Title of note',
    demand: true,
    alias: 't'
};

const bodyOptions = {
    describe: 'Note body',
    demand: true,
    alias: 'b'
};

const argv = yargs
    .command('add', 'Add a new note', {         //Define the commands exposed by your application.
        title: titleOptions,
        body: bodyOptions
    })
    .command('list', 'List all notes')
    .command('read', 'Read a note', {
        title: titleOptions
    })
    .command('remove', 'Remove a note', {
        title: titleOptions
    })
    .help()
    .argv;
const command = argv._[0];                  //grabs first element of yargs array

if (command === 'add') {
    let note = notes.addNote(argv.title, argv.body);
    if(note) {
        console.log(`Note created.`);
        notes.logNote(note);
    } else {
        console.log(`Note with title ${argv.title} already exists.`);
    }

} else if (command === 'list') {
    let allNotes = notes.getAll();
    console.log(`Printing ${allNotes.length} note(s).`);
    allNotes.forEach((note) => notes.logNote(note));

} else if (command === 'read') {
    let note = notes.getNote(argv.title);
    if(note) {
        console.log('Note found.');
        notes.logNote(note);
    } else {
        console.log(`Note not found`);
    }

} else if (command === 'remove') {
    let noteRemoved = notes.removeNote(argv.title);                         //has value of true or false
    let message = noteRemoved ? 'Note removed.' : 'Note not found.';
    console.log(message);

} else {
    console.log('Command not recognized');
}