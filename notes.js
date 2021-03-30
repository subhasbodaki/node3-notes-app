const chalk = require('chalk')
const fs=require('fs')
const { argv } = require('process')


const getNotes= () => {
    return "Your Notes...!"
}

const addNote=(title,body) => {
    const notes=loadNotes()
    //const duplicateNotes=notes.filter( (note) => note.title === title)
    const duplicateNote = notes.find((note) => note.title === title)


    if(!duplicateNote)          //if(duplicateNote === undefined)
    { 
        notes.push({
            title:title,
            body:body
        }) 
        savenotes(notes)
        console.log(chalk.inverse.green('New Note added..'));
    }
    else{
        console.log(chalk.inverse.red('Note title already taken'));
    }
    
}

const removeNote= (title) =>  {
    const notes=loadNotes()
    const notesToKeep=notes.filter((notes) => notes.title !== title)

    if(notes.length > notesToKeep.length){
        console.log(chalk.green.inverse('note is removed'));
        savenotes(notesToKeep)
    }
    else {
        console.log(chalk.red.inverse('No note found..!'));
    }
   
}

const listNotes = () => {
    const notes = loadNotes()
    console.log(chalk.inverse.blue('Your Notes'));

    notes.forEach((notes) => {
        console.log(notes.title);
    })

}

const readNote = (title) => {
    const notes = loadNotes()
    
    const note = notes.find((note) => note.title === title )

    if(note){
        console.log(chalk.inverse(note.title));
        console.log(note.body);
    }
    else{
        console.log("No note found with that",title);
    }

}

const savenotes=(notes) => {
    const noteJSON=JSON.stringify(notes)
    fs.writeFileSync('notes.json',noteJSON)
}

const loadNotes =() => {
    try{
        const dataBuffer=fs.readFileSync('notes.json')
        const datasJson=dataBuffer.toString()
        return JSON.parse(datasJson)
    }catch(e){
        return []
    }    
}


module.exports={
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}