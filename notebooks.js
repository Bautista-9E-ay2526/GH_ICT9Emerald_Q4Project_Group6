
var currentSubject = "";

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

function openNotebook(subject, teacher) {

  currentSubject = subject;

  document.getElementById("modal-subject-title").innerHTML = "&#128211; " + subject + " Notebook";

  document.getElementById("notebook-modal-overlay").classList.add("show");

  renderNotes();

  document.getElementById("new-note-input").value = "";
}

function closeNotebook() {
  document.getElementById("notebook-modal-overlay").classList.remove("show");
  currentSubject = "";
}

function getNotes(subject) {

  var stored = localStorage.getItem("notebook_" + subject);

  if (stored) {
    return JSON.parse(stored);
  } else {
 
    if (defaultNotes[subject]) {
      return defaultNotes[subject];
    }
    return [];
  }
}

function saveNotes(subject, notesArr) {
  localStorage.setItem("notebook_" + subject, JSON.stringify(notesArr));
}

function renderNotes() {
  var notes = getNotes(currentSubject);
  var container = document.getElementById("entries-container");
  var html = "";


  for (var i = 0; i < notes.length; i++) {
    var note = notes[i];
    html += '<div class="notebook-entry">';
    html += '<span class="entry-date">&#128197; ' + note.date + '</span>';
    html += '<h6>' + note.title + '</h6>';
    html += '<p>' + note.body + '</p>';
    html += '</div>';
  }

  if (notes.length === 0) {
    html = '<p style="color:#999; font-size:0.88rem; text-align:center; padding:20px 0;">No notes yet. Add your first note below!</p>';
  }

  container.innerHTML = html;
}

function addNote() {
  var input = document.getElementById("new-note-input");
  var text = input.value.trim();

  if (text === "") {
    window.alert("Please write something before saving!");
    return;
  }

  var today = new Date();
  var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  var dateStr = months[today.getMonth()] + " " + today.getDate() + ", " + today.getFullYear();

  var newNote = {
    title: currentSubject + " Note",
    body: text,
    date: dateStr
  };

  var notes = getNotes(currentSubject);
  notes.push(newNote);
  saveNotes(currentSubject, notes);

  renderNotes();

  input.value = "";
}

document.getElementById("notebook-modal-overlay").addEventListener("click", function(e) {
  if (e.target === this) {
    closeNotebook();
  }
});

