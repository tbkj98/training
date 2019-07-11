// Fetching reference of single note
let singleNote = document.getElementsByClassName('sticky-div')[0];

// Fetching reference of main
let mainSection = document.getElementById('main');

// variable to check if first note or not
let count = 0;

// Get a random number between -2 and 2
let getRandomNumber = function () {
    return (Math.floor(Math.random() * 5) - 2);
}

// Function to add Note on screen
let addNoteOnScreen = function (noteValue) {

    // console.log(typeof(noteValue));

    if (count === 0) {
        // No note present on screen
        // change to style.display property of singleNote
        singleNote.style.display = 'inline-block';
        singleNote.style.transform = `rotate(${getRandomNumber()}deg)`;

        if (noteValue && typeof (noteValue) == 'string') {
            singleNote.childNodes[5].note.value = noteValue;
        }

        singleNote.childNodes[5].note.addEventListener('focusout', function () {
            saveNotes(this.value);
        });

        count++;
    } else {

        // Notes already present on screen
        // need to create new note
        let newSingleNote = singleNote.cloneNode(true);
        newSingleNote.style.transform = `rotate(${getRandomNumber()}deg)`;
        // Setting note value to blank
        if (noteValue && typeof (noteValue) == 'string') {
            singleNote.childNodes[5].note.value = noteValue;
        } else {
            newSingleNote.childNodes[5].note.value = '';
        }
        newSingleNote.childNodes[5].note.addEventListener('focusout', function () {
            saveNotes(this.value);
        });
        // console.log(newSingleNote);
        // add it to screen
        mainSection.append(newSingleNote);
    }
};

// Check if notes already exists
let notes = localStorage.getItem('notes');
if (notes) {
    // notes exists
    // Create notes list

    notes = JSON.parse(notes);
    for (let i = notes.data.length - 1; i >= 0; i--) {
        addNoteOnScreen(notes.data[i]);
    }
}

// Configuring add notes button
document.getElementById('add-button')
    .addEventListener('click', addNoteOnScreen);


// Delegating mainSection's click event to delete buttons
mainSection.addEventListener('click', function (event) {
    // Check if the delete button clicked or not
    if (event.target.tagName == 'IMG' && event.target.parentNode.tagName == 'DIV') {
        // Delete note clicked
        // deleting note from screen
        deleteNote(event.target.parentElement.childNodes[5].childNodes[3].value);
        event.target.parentElement.remove();
    }
});

// Function to save notes
function saveNotes(note) {
    let notes = localStorage.getItem('notes');
    if (!notes) {
        // Notes doesn't exists
        notes = {};
        notes.data = [];
    } else {
        // Notes already exists
        notes = JSON.parse(notes);
    }

    // Checking if note already exists
    if (notes.data.indexOf(note) == -1) {
        // Note doesn't exists already
        notes.data.push(note);
    } else {
        // Notes already exists
        return;
    }



    notes = JSON.stringify(notes);
    localStorage.setItem('notes', notes);
}

let deleteNote = function (noteValue) {

    // Showing confirm box
    if (window.confirm('Do you want to delete note ?')) {
        // Yes
        let notes = localStorage.getItem('notes');

        notes = JSON.parse(notes);

        let index = notes.data.indexOf(noteValue);
        if (index > -1) {
            notes.data.splice(index, 1);
        }

        localStorage.setItem('notes', JSON.stringify(notes));
    } else {
        // No
        return;
    }

};