const chalk=require('chalk')
const { command, demandOption, string } = require('yargs')
const yargs = require('yargs')
const { removeNote, listNotes } = require('./notes.js')
const notes=require('./notes.js')

//customize yargs version
yargs.version('1.1.0')

//add, remove, read, list

//creating a add command
yargs.command({
    command:'add',
    describe: 'Adds a New note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption:true,
            type: 'string'
        },

        body: {
            describe: 'Note Body',
            type:'string',
            demandOption:true
        }
    },
    handler(argv) {
        notes.addNote(argv.title,argv.body)
    }
})

//creating remove command
yargs.command({
    command: 'remove',
    describe: 'remove a notes',
    builder: {
        title: {
            describe: 'note a title',
            demandOption: true,
            type: 'string'
        }    
    },
    handler(argv) {
        notes.removeNote(argv.title)
    }
})


//creating list command
yargs.command({
    command: 'list',
    describe: 'List the notes',
    handler(){
        notes.listNotes()
    }
})

//creating read command
yargs.command({
    command: 'read',
    describe: 'Read the notes',
    builder: {
        title : {
            describe: 'Note a title',
            demandOption: true,
            type : 'string'    
        }
    },
    handler(argv){
        notes.readNote(argv.title)
    }
})


//console.log(yargs.argv)
yargs.parse()


