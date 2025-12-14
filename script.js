let notesTitles = [];
let notes = [];

let archiveNotesTitles = [];
let archiveNotes = [];

let trashNotesTitles = [];
let trashNotes = [];
// Der Notizblock hat hier oben eine komplizierte Array Struktur. Und diese wollen wir zusammenfassen.
// Für die Objekt Aufgabe:
// Ich mache ein Objekt, wo die Array Namen die keys sind und ihre arrays stehen dahinter als values.
let allNotes = {
    'notesTitles': [],
    'notes': [],
    'archiveNotesTitles': [],
    'archiveNotes': [],
    'trashNotesTitles': [],
    'trashNotes': []
};


function renderNotesTitles() {
    let contentRef = document.getElementById('content');
    contentRef.innerHTML = "";

    for (let indexNotesTitels = 0; indexNotesTitels < allNotes.notesTitles.length; indexNotesTitels++) {
        contentRef.innerHTML += getNoteTamplate(indexNotesTitels);
    }
}

function renderNotes() {
let contentRef = document.getElementById('content');
contentRef.innerHTML = ""; 

for (let indexNote = 0; indexNote < allNotes.notes.length; indexNote++) {
    contentRef.innerHTML += getNoteTamplate(indexNote);
}

renderTrashNotesTitles();
renderTrashNotes();
renderArchiveNotesTitles();
renderArchiveNotes();
}

function renderArchiveNotesTitles() {
    let archiveContentRef = document.getElementById('archive_content');
    archiveContentRef.innerHTML = "";
    for (let indexArchiveNotesTitels = 0; indexArchiveNotesTitels < allNotes.archiveNotesTitles.length; indexArchiveNotesTitels++) {
        archiveContentRef.innerHTML += getArchiveNoteTemplate(indexArchiveNotesTitels);
    }
}

function renderArchiveNotes() {
    let archiveContentRef = document.getElementById('archive_content'); 
    archiveContentRef.innerHTML = "";
    for (let indexArchiveNote = 0; indexArchiveNote < allNotes.archiveNotes.length; indexArchiveNote++) {
        archiveContentRef.innerHTML += getArchiveNoteTemplate(indexArchiveNote);
    }
}

function renderTrashNotesTitles() {
    let trashContentRef = document.getElementById('trash_content');
    trashContentRef.innerHTML = "";

    for (let indexTrashNotesTitels = 0; indexTrashNotesTitels < allNotes.trashNotesTitles.length; indexTrashNotesTitels++) {
        trashContentRef.innerHTML += getTrashNoteTemplate(indexTrashNotesTitels);
    }
}

function renderTrashNotes() {
    let trashContentRef = document.getElementById('trash_content');
    trashContentRef.innerHTML = "";

    for (let indexTrashNote = 0; indexTrashNote < allNotes.trashNotes.length; indexTrashNote++) {
        trashContentRef.innerHTML += getTrashNoteTemplate(indexTrashNote);
    }
}

function addNote() {
    let titleInputRef = document.getElementById('title_input');
    let titleInput = titleInputRef.value.trim();
    let noteInputRef = document.getElementById('note_input'); 
    let noteInput = noteInputRef.value.trim();

    if (titleInput === "" || noteInput === "") {
        alert("Bitte füllen Sie sowohl den Titel als auch das Notizfeld aus.");
        return;
    }
    
    notesTitles.push(titleInput);
    notes.push(noteInput);

    titleInputRef.value = "";
    noteInputRef.value = "";

    renderNotesTitles();
    renderNotes();

    saveToLocalStorage();
}

function saveToLocalStorage() {
    localStorage.setItem("notesTitles", JSON.stringify(notesTitles));
    localStorage.setItem("notes", JSON.stringify(notes));
    localStorage.setItem("archiveNotesTitles", JSON.stringify(archiveNotesTitles));
    localStorage.setItem("archiveNotes", JSON.stringify(archiveNotes));
    localStorage.setItem("trashNotesTitles", JSON.stringify(trashNotesTitles));
    localStorage.setItem("trashNotes", JSON.stringify(trashNotes));
}

function getFromLocalStorage() {
    let storedTitles = JSON.parse(localStorage.getItem("notesTitles"));
    let storedNotes = JSON.parse(localStorage.getItem("notes"));
    if (storedTitles && storedNotes) {
        notesTitles = storedTitles;
        notes = storedNotes;
    }
    let storedArchiveTitles = JSON.parse(localStorage.getItem("archiveNotesTitles"));
    let storedArchiveNotes = JSON.parse(localStorage.getItem("archiveNotes"));
    if (storedArchiveTitles && storedArchiveNotes) {
        archiveNotesTitles = storedArchiveTitles;
        archiveNotes = storedArchiveNotes;
    }
    let storedTrashTitles = JSON.parse(localStorage.getItem("trashNotesTitles"));
    let storedTrashNotes = JSON.parse(localStorage.getItem("trashNotes"));
    if (storedTrashTitles && storedTrashNotes) {
        trashNotesTitles = storedTrashTitles;
        trashNotes = storedTrashNotes;
    }
}

getFromLocalStorage();

function pushToArchiveNote(indexNote) {
    let archiveNote = notes.splice(indexNote, 1);
    archiveNotes.push(archiveNote[0]);
    let archiveNoteTitle = notesTitles.splice(indexNote, 1);
    archiveNotesTitles.push(archiveNoteTitle[0]);
    renderNotes();
    renderArchiveNotes();
    saveToLocalStorage();
}

function pushFromArchiveToNote(indexArchiveNote) {
    let note = archiveNotes.splice(indexArchiveNote, 1); // Ich splice die Notiz aus dem array archiveNotes und speichere sie in der Variable note.
    notes.push(note[0]); // Die wiederhergestellte Notiz wird dem array notes hinzugefügt.
    let noteTitle = archiveNotesTitles.splice(indexArchiveNote, 1);
    notesTitles.push(noteTitle[0]); // Die wiederhergestellte Notiz wird dem array notesTitels hinzugefügt.
    renderArchiveNotes(); // Die Funktion renderArchiveNotes() wird aufgerufen, damit die wiederhergestellte Notiz nicht mehr im Archiv angezeigt wird.
    renderNotes(); // Die Funktion renderNotes() wird aufgerufen, damit die wiederhergestellte Notiz im Notizbereich angezeigt wird.
    saveToLocalStorage(); // Notizen im localStorage speichern
}

function pushFromArchiveToTrash(indexArchiveNote) {
    let trashNote = archiveNotes.splice(indexArchiveNote, 1); // Ich splice die Notiz aus dem array archiveNotes und speichere sie in der Variable trashNote.
    trashNotes.push(trashNote[0]); // Die gelöschte Notiz wird dem array trashNotes hinzugefügt.
    let trashNoteTitle = archiveNotesTitles.splice(indexArchiveNote, 1);
    trashNotesTitles.push(trashNoteTitle[0]); // Die gelöschte Notiz wird dem array trashNotesTitels hinzugefügt.
    renderArchiveNotes(); // Die Funktion renderArchiveNotes() wird aufgerufen, damit die gelöschte Notiz nicht mehr im Archiv angezeigt wird.
    renderTrashNotes(); // Die Funktion renderTrashNotes() wird aufgerufen, damit die gelöschte Notiz im Papierkorb angezeigt wird.
    saveToLocalStorage(); // Notizen im localStorage speichern
}

// 6. notizen löschen
// Funktion deleteNote wird aufgerufen, wenn der User eine Notiz löschen möchte.
// Der Funktion wird der Index der zu löschenden Notiz übergeben.
function pushToTrash(indexNote) {
    // Notiz aus dem array notes mit splice löschen:
    // splice(index, anzahl der zu löschenden einträge)
    let trashNote = notes.splice(indexNote, 1); // Ich splice die Notiz aus dem array notes und speichere sie in der Variable trashNote.
    trashNotes.push(trashNote[0]); // Die gelöschte Notiz wird dem array trashNotes hinzugefügt.
    let trashNoteTitle = notesTitles.splice(indexNote, 1);
    trashNotesTitles.push(trashNoteTitle[0]); // Die gelöschte Notiz wird dem array trashNotesTitels hinzugefügt.

    // Eingabe anzeigen lassen:
    renderNotes(); // Die Funktion renderNotes() wird aufgerufen, damit die gelöschte Notiz nicht mehr angezeigt wird.
    renderTrashNotes(); // Die Funktion renderTrashNotes() wird aufgerufen, damit die gelöschte Notiz im Papierkorb angezeigt wird.
    saveToLocalStorage(); // Notizen im localStorage speichern
}

function pushFromTrashToNote(indexTrashNote) {
    let note = trashNotes.splice(indexTrashNote, 1); // Ich splice die Notiz aus dem array trashNotes und speichere sie in der Variable note.
    notes.push(note[0]); // Die wiederhergestellte Notiz wird dem array notes hinzugefügt.
    let noteTitle = trashNotesTitles.splice(indexTrashNote, 1);
    notesTitles.push(noteTitle[0]); // Die wiederhergestellte Notiz wird dem array notesTitels hinzugefügt.
    renderTrashNotes(); // Die Funktion renderTrashNotes() wird aufgerufen, damit die wiederhergestellte Notiz nicht mehr im Papierkorb angezeigt wird.
    renderNotes(); // Die Funktion renderNotes() wird aufgerufen, damit die wiederhergestellte Notiz im Notizbereich angezeigt wird.
    saveToLocalStorage(); // Notizen im localStorage speichern
}

// Notiz endgültig löschen
function deleteTrashNote(indexTrashNote) {
    trashNotesTitles.splice(indexTrashNote, 1); // Ich splice den Titel der Notiz aus dem array trashNotesTitles.
    trashNotes.splice(indexTrashNote, 1); // Ich splice die Notiz aus dem array trashNotes.
    renderTrashNotes(); // Die Funktion renderTrashNotes() wird aufgerufen, damit die Notiz nicht mehr im Papierkorb angezeigt wird.
    renderTrashNotesTitles(); // Die Funktion renderTrashNotesTitles() wird aufgerufen, damit der Titel der Notiz nicht mehr im Papierkorb angezeigt wird.
    saveToLocalStorage(); // Notizen im localStorage speichern
}