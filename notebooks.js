// ============================================================
// notebooks.js — Virtual Notebooks JavaScript
// Student Portal System | ICT 9 Fourth Quarter 2025-2026
// Uses: variables, operators, comments, functions, events,
//       conditionals, iteration, and JS outputs (innerHTML, alert)
// ============================================================

// Variable: currently open subject
var currentSubject = "";

// Default starter notes per subject (conditional population)
var defaultNotes = {
  "Filipino":         [{ title: "Pagbabasa at Pagsulat", body: "Ang pagbabasa ay isang mahalagang kasanayan. Gumawa ng buod sa bawat kabanata.", date: "Jan 10, 2026" }],
  "English":          [{ title: "Parts of Speech", body: "Nouns name a person, place, thing, or idea. Verbs express action or state of being.", date: "Jan 12, 2026" }],
  "Math":             [{ title: "Quadratic Equations", body: "ax squared + bx + c = 0. Use the quadratic formula: x = (-b plus or minus sqrt(b squared - 4ac)) / 2a", date: "Jan 15, 2026" }],
  "Science":          [{ title: "Living Things", body: "All living organisms share traits: cellular organization, metabolism, homeostasis, growth, and reproduction.", date: "Jan 14, 2026" }],
  "Social Studies":   [{ title: "Philippine History", body: "The Spanish colonial period lasted 333 years (1565-1898). Key events include the Battle of Mactan.", date: "Jan 16, 2026" }],
  "Values Education": [{ title: "Pagpapahalaga", body: "Ang mga pangunahing pagpapahalaga ay kinabibilangan ng katapatan, paggalang, at pagmamahal.", date: "Jan 18, 2026" }],
  "ICT":              [{ title: "HTML Basics", body: "HTML stands for HyperText Markup Language. Every page starts with the DOCTYPE declaration.", date: "Feb 3, 2026" }],
  "PE":            [{ title: "Music Notes", body: "The musical staff has 5 lines. Notes: Do Re Mi Fa Sol La Ti Do correspond to C D E F G A B C.", date: "Jan 20, 2026" }]
};

// FUNCTION: Open the notebook modal for a given subject
function openNotebook(subject, teacher) {
  // Assign variable for current subject
  currentSubject = subject;

  // Update modal title — JavaScript Output: innerHTML
  document.getElementById("modal-subject-title").innerHTML = "&#128211; " + subject + " Notebook";

  // Show the modal overlay
  document.getElementById("notebook-modal-overlay").classList.add("show");

  // Render existing notes
  renderNotes();

  // Clear the textarea input
  document.getElementById("new-note-input").value = "";
}

// FUNCTION: Close the notebook modal
function closeNotebook() {
  document.getElementById("notebook-modal-overlay").classList.remove("show");
  // Reset current subject variable
  currentSubject = "";
}

// FUNCTION: Get saved notes from localStorage for a subject
function getNotes(subject) {
  // Variable to hold stored data
  var stored = localStorage.getItem("notebook_" + subject);

  // Conditional: if data exists, parse and return it
  if (stored) {
    return JSON.parse(stored);
  } else {
    // Conditional: use default notes if available for this subject
    if (defaultNotes[subject]) {
      return defaultNotes[subject];
    }
    // Return empty array if no notes exist
    return [];
  }
}

// FUNCTION: Save notes array to localStorage
function saveNotes(subject, notesArr) {
  localStorage.setItem("notebook_" + subject, JSON.stringify(notesArr));
}

// FUNCTION: Render all notes using iteration (for loop)
function renderNotes() {
  // Variables for notes data and output
  var notes = getNotes(currentSubject);
  var container = document.getElementById("entries-container");
  var html = "";

  // Iteration: loop through each note and build HTML
  for (var i = 0; i < notes.length; i++) {
    var note = notes[i];

    // Use string operator (+) to concatenate HTML
    html += '<div class="notebook-entry">';
    html += '<span class="entry-date">&#128197; ' + note.date + '</span>';
    html += '<h6>' + note.title + '</h6>';
    html += '<p>' + note.body + '</p>';
    html += '</div>';
  }

  // Conditional: show placeholder message if no notes found
  if (notes.length === 0) {
    html = '<p style="color:#999; font-size:0.88rem; text-align:center; padding:20px 0;">No notes yet. Add your first note below!</p>';
  }

  // JavaScript Output: innerHTML to display notes
  container.innerHTML = html;
}

// FUNCTION: Add a new note (triggered by button click event)
function addNote() {
  // Variable: get the textarea input element
  var input = document.getElementById("new-note-input");
  var text = input.value.trim();

  // Conditional: check if input is empty before saving
  if (text === "") {
    // JavaScript Output: window.alert for user feedback
    window.alert("Please write something before saving!");
    return;
  }

  // Get today's date using JS Date object
  var today = new Date();
  var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  // Variables and operators: build the date string
  var dateStr = months[today.getMonth()] + " " + today.getDate() + ", " + today.getFullYear();

  // Variable: create a new note object
  var newNote = {
    title: currentSubject + " Note",
    body: text,
    date: dateStr
  };

  // Get existing notes, push new one, and save (array operator)
  var notes = getNotes(currentSubject);
  notes.push(newNote);
  saveNotes(currentSubject, notes);

  // Re-render the notes list
  renderNotes();

  // Clear the input field
  input.value = "";
}

// EVENT: Close modal when clicking outside the modal box
document.getElementById("notebook-modal-overlay").addEventListener("click", function(e) {
  // Conditional: only close if the overlay itself was clicked
  if (e.target === this) {
    closeNotebook();
  }
});

// JavaScript Comment: notebooks.js fully loaded and initialized.
