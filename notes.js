const fs = require('fs')

/*const addNote = (title,body) =>{
    const notes = loadNotes() // []    [{title:"new1",body:"body1"}]
    notes.push({  // [{title:"new1",body:"body1"},{title:"new2",body:"body2"}]
        title:title,
        body
        
    })
    saveNotes(notes)
}
*/
//v2
const addNote = (title,body) =>{
    const notes = loadNotes() // []    [{title:"new1",body:"body1"}]
    const duplicateTitles = notes.filter((obj)=>{
        //new1===new2 false
        //new2===new2 true
        return obj.title === title //return true(1) or false(0)
    }
    )
    if(duplicateTitles.length == 0){
    notes.push({  // [{title:"new1",body:"body1"},{title:"new2",body:"body2"}]
        title:title,
        body
        
    })
    saveNotes(notes)
    console.log("saved successfully")
}
else{
    console.log("duplicated Titles Try again")
}

}





const loadNotes = () =>{
    // error (first time run)
    // const dataBuffer = fs.readFileSync('notes.json').toString()
    // return JSON.parse(dataBuffer) // Object
    try{

    const dataBuffer = fs.readFileSync('notes.json').toString()
    console.log(dataBuffer) //json
    return JSON.parse(dataBuffer) // Object // [{title:"new1",body:"body1"}]
    }
    catch{
        return []
    }
}



const saveNotes = (notes) =>{
    console.log(notes)
 // [{title:"new1",body:"body1"}] --> [{"title":"new1","body":"body1"}]
 // [{title:"new1",body:"body1"},{title:"new2",body:"body2"}]
    const saveData = JSON.stringify(notes)
    console.log(saveData)
    fs.writeFileSync('notes.json',saveData)
}


const deleteNotes= (title)=>{
    const notes= loadNotes()
    const notesToKeep = notes.filter((obj) =>{
        return obj.title !== title
    }
    )
    console.log(notesToKeep)
    saveNotes(notesToKeep)
    console.log("Deleted")
}


//read notes
const readNote = (title)=>{
    const notes= loadNotes()
    const note= notes.find((obj)=>{
        return obj.title == title
    }
    )
    console.log(note)
    if(note){
        console.log(note.body)
    }
    else{
        console.log('Note Not Found')
    }
}

//list notes
const listNotes = ()=>{
    const notes= loadNotes()
    const note= notes.forEach((el)=>{
        console.log(el.title,el.body)
    }
    )
    
}

module.exports = {
    addNote,
    deleteNotes,
    readNote,
    listNotes
}