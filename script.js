// notizen erstellen und anzeigen lassen
// 1. Ich brauche Notizen.
let notesTitles = []; // Titel der Notizen
let notes = []; // Notizen

// Archiv für archivierte Notizen
let archiveNotesTitles = []; // Titel der archivierten Notizen
let archiveNotes = []; // Archivierte Notizen

// Papierkorb für gelöschte Notizen
let trashNotesTitles = []; // Titel der gelöschten Notizen
let trashNotes = []; // Gelöschte Notizen

function renderNotesTitles() {
    let contentRef = document.getElementById('content');
    contentRef.innerHTML = "";

    for (let indexNotesTitels = 0; indexNotesTitels < notesTitles.length; indexNotesTitels++) {
        contentRef.innerHTML += getNoteTamplate(indexNotesTitels);
    }
}

// 2. Wann werden sie angezeigt?
function renderNotes() { // WANN? renderNotes() wird am Anfang mit onload im body-Tag aufgerufen.
// 3. Ich muss definieren, wo sie anzuzeigen sind.
// In dem Fall gebe ich der id content eine Variable namens contentRef.
let contentRef = document.getElementById('content'); // WO? sie werden im div mit der id "content" angezeigt.
// Der Inhalt des divs mit der id "content" wird geleert, damit nicht immer wieder die alten Notizen dazustehen.
contentRef.innerHTML = ""; 

// For-loop:
// Es startet bei indexNote = 0
// Solange indexNote kleiner ist als die Länge des arrays notes, wird der loop ausgeführt
// indexNote wird bei jedem Durchlauf mit indexNote++ um 1 erhöht
for (let indexNote = 0; indexNote < notes.length; indexNote++) {
    // Der Inhalt des divs mit der id "content" wird um den Wert der Variable note erweitert
    // Dazu wird die Funktion getNoteTemplate aufgerufen, der die Variable note übergeben wird.
    contentRef.innerHTML += getNoteTamplate(indexNote);
// Notizen im localStorage speichern
}

renderTrashNotesTitles();
renderTrashNotes();
renderArchiveNotesTitles();
renderArchiveNotes();
}

function renderArchiveNotesTitles() {
    let archiveContentRef = document.getElementById('archive_content');
    archiveContentRef.innerHTML = "";
    for (let indexArchiveNotesTitels = 0; indexArchiveNotesTitels < archiveNotesTitles.length; indexArchiveNotesTitels++) {
        archiveContentRef.innerHTML += getArchiveNoteTemplate(indexArchiveNotesTitels);
    }
}

function renderArchiveNotes() {
    let archiveContentRef = document.getElementById('archive_content'); 
    archiveContentRef.innerHTML = "";
    for (let indexArchiveNote = 0; indexArchiveNote < archiveNotes.length; indexArchiveNote++) {
        archiveContentRef.innerHTML += getArchiveNoteTemplate(indexArchiveNote);
    }
}

// Papierkorb Bereich
// Funktion zum Rendern der Titel der gelöschten Notizen im Papierkorb
function renderTrashNotesTitles() {
    let trashContentRef = document.getElementById('trash_content');
    trashContentRef.innerHTML = "";

    for (let indexTrashNotesTitels = 0; indexTrashNotesTitels < trashNotesTitles.length; indexTrashNotesTitels++) {
        trashContentRef.innerHTML += getTrashNoteTemplate(indexTrashNotesTitels);
    }
}


// Funktion zum Rendern der gelöschten Notizen im Papierkorb
function renderTrashNotes() {
    let trashContentRef = document.getElementById('trash_content'); // Referenz zum div mit der id "trash_content"
    // Den Inhalt des divs mit der id "trash_content" leeren
    trashContentRef.innerHTML = "";

    for (let indexTrashNote = 0; indexTrashNote < trashNotes.length; indexTrashNote++) {
        trashContentRef.innerHTML += getTrashNoteTemplate(indexTrashNote);
    }
}




// 5. notizen hinzufügen
// Eingabe vom User definieren:
// Funktion addNote wird aufgerufen, wenn der User auf den Button "Notiz speichern" klickt.
function addNote() {
    let titleInputRef = document.getElementById('title_input'); // Die Variable titleInputRef bekommt das Input-Feld mit der id "title_input"
    // Eingabe auslesen:
    let titleInput = titleInputRef.value.trim(); // Die Variable titleInput bekommt den Wert des Input-Felds durch .value. trim() entfernt Leerzeichen am Anfang und Ende der Eingabe.
    
    let noteInputRef = document.getElementById('note_input'); // Die Variable noteInputRef bekommt das Input-Feld mit der id "note_input"
    
    // Eingabe auslesen:
    let noteInput = noteInputRef.value.trim(); // Die Variable noteInput bekommt den Wert des Input-Felds durch .value
    // Referenzen zu den HTML-Elementen und das was man dann damit maccht, sollte man voneinander trennen.

    // Überprüfung: Sind Titel oder Notiz leer?
    if (titleInput === "" || noteInput === "") {
        alert("Bitte füllen Sie sowohl den Titel als auch das Notizfeld aus.");
        return; // Die Funktion wird hier abgebrochen, wenn Felder leer sind
    }
    
    notesTitles.push(titleInput); // Die Eingabe wird dem Array notesTitles hinzugefügt.
    // Eingabe speichern (den array notes hinzufügen):
    notes.push(noteInput); // Die Eingabe wird dem Array notes hinzugefügt.

    titleInputRef.value = ""; // Das Input-Feld des Titels wird geleert, damit der User einen neuen Titel eingeben kann.
    noteInputRef.value = ""; // Das Input-Feld wird geleert, damit der User eine neue Notiz eingeben kann.

    // Eingabe anzeigen lassen:
    renderNotesTitles(); // Die Funktion renderNotesTitles() wird aufgerufen, damit der Titel der neuen Notiz angezeigt wird.
    renderNotes(); // Die Funktion renderNotes() wird aufgerufen, damit die neue Notiz angezeigt wird.

    saveToLocalStorage();
    // Notizen im localStorage speichern
}

// Daten im localStorage speichern:
// Die arrays notesTitles und notes im localStorage speichern
function saveToLocalStorage() {
    localStorage.setItem("notesTitles", JSON.stringify(notesTitles));
    localStorage.setItem("notes", JSON.stringify(notes));
    localStorage.setItem("archiveNotesTitles", JSON.stringify(archiveNotesTitles));
    localStorage.setItem("archiveNotes", JSON.stringify(archiveNotes));
    localStorage.setItem("trashNotesTitles", JSON.stringify(trashNotesTitles));
    localStorage.setItem("trashNotes", JSON.stringify(trashNotes));
}

// Daten aus dem localStorage holen:
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
// Daten aus dem localStorage holen, wenn die Seite geladen wird
getFromLocalStorage();

function pushToArchiveNote(indexNote) {
    let archiveNote = notes.splice(indexNote, 1); // Ich splice die Notiz aus dem array notes und speichere sie in der Variable archiveNote.
    archiveNotes.push(archiveNote[0]); // Die archivierte Notiz wird dem array archiveNotes hinzugefügt.
    let archiveNoteTitle = notesTitles.splice(indexNote, 1);
    archiveNotesTitles.push(archiveNoteTitle[0]); // Die archivierte Notiz wird dem array archiveNotesTitels hinzugefügt.
    renderNotes(); // Die Funktion renderNotes() wird aufgerufen, damit die archivierte Notiz nicht mehr angezeigt wird.
    renderArchiveNotes(); // Die Funktion renderArchiveNotes() wird aufgerufen, damit die archivierte Notiz im Archiv angezeigt wird.
    saveToLocalStorage(); // Notizen im localStorage speichern
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