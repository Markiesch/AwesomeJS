const titleEl = document.querySelector(".note-title");
const textEl = document.querySelector(".note-text");
const toggleFavBtn = document.querySelector(".toggle--favorite");
const tabs = document.querySelectorAll(".tab");
const navItems = document.querySelectorAll(".navItem");
const editorTab = document.querySelector(".editor--tab");
const notesTab = document.querySelector(".notes--tab");
const favoritesTab = document.querySelector(".favorites--tab");
const deletedTab = document.querySelector(".deleted--tab");
const downloadBtn = document.querySelector(".downloadBtn");

let noteData = [];
let currentTab = false;

if (localStorage.getItem("note")) noteData = JSON.parse(localStorage.getItem("note"));

toggleFavBtn.addEventListener("click", toggleFavorite);
downloadBtn.addEventListener("click", () => downloadToFile(textEl.value, `${titleEl.value}.txt`, "text/plain"));
addEventListener("keyup", () => {
  if (currentTab) saveFile();
});

const downloadToFile = (content, filename, contentType) => {
  const a = document.createElement("a");
  const file = new Blob([content], { type: contentType });

  a.href = URL.createObjectURL(file);
  a.download = filename;
  a.click();

  URL.revokeObjectURL(a.href);
};

function saveFile() {
  if (currentTab !== false) {
    noteData[currentTab].title = titleEl.value;
    noteData[currentTab].text = textEl.value;
  }
  localStorage.setItem("note", JSON.stringify(noteData));
}

function openTab(tabName) {
  createPages();

  // Activate selected tab
  for (const tab of tabs) tab.style.display = "none";
  document.querySelector("." + tabName).style.display = "block";

  if (tabName === "editor--tab") return;

  for (const navItem of navItems) navItem.classList.remove("active");
  document.querySelector("." + tabName + "__button").classList.add("active");
}

function openEditor(editorID) {
  currentTab = editorID;
  openTab("editor--tab");

  titleEl.value = noteData[currentTab].title;
  textEl.value = noteData[currentTab].text;

  loadFavorite();
}

function createFile() {
  noteData.push({ title: `title ${noteData.length + 1}`, text: "text", favorite: false, id: noteData.length, deleted: false });
  const index = noteData.length - 1;
  openEditor(index);
  saveFile();
}

function toggleFavorite() {
  noteData[currentTab].favorite = !noteData[currentTab].favorite;
  loadFavorite();
  saveFile();
}

function loadFavorite() {
  const newClass = noteData[currentTab].favorite ? "favoriteSvg" : "nonFavoriteSvg";
  const oldClass = noteData[currentTab].favorite ? "nonFavoriteSvg" : "favoriteSvg";
  toggleFavBtn.classList.add(newClass);
  toggleFavBtn.classList.remove(oldClass);
}

const deleteEl = document.querySelector(".deleteBtn");
deleteEl.addEventListener("click", () => deleteNote());

function deleteNote(index) {
  const targetId = index ?? currentTab;
  const target = noteData.find((note) => note.id === targetId);
  if (target) target.deleted = true;
  openTab("notes--tab");
  saveFile();
  createPages();
}

function recoverNote(index) {
  const targetId = index ?? currentTab;
  const target = noteData.find((note) => note.id === targetId);
  if (target) target.deleted = false;
  saveFile();
  createPages();
}

function permDeleteNote() {
  const index = currentTab;
  if (currentTab === false) return;
  noteData.splice(index, 1);
  currentTab = false;
  openTab("notes--tab");
  saveFile();
  updateId();
}

function updateId() {
  noteData.forEach((element, index) => (element.id = index));
  saveFile();
}

// Create page helpers
function createNotePage() {
  const notes = noteData.filter((note) => !note.deleted);
  if (!notes.length) return (notesTab.innerHTML = `<h4>It looks like you dont have any files</h4>`);

  notesTab.innerHTML = "<h2>All documents</h2><article></article>";
  for (const note of notes) generateCard(notesTab.querySelector("article"), note);
}

function createFavoritePage() {
  const favoriteNotes = noteData.filter((note) => note.favorite);
  if (favoriteNotes.length == 0) return (favoritesTab.innerHTML = `<h4>It looks like you dont have any favorite files yet</h4>`);

  favoritesTab.innerHTML = "<h2>Favorite Notes</h2><article></article>";
  for (const note of favoriteNotes) generateCard(favoritesTab.querySelector("article"), note);
}

function createDeletedPage() {
  const deletedNotes = noteData.filter((note) => note.deleted);
  if (!deletedNotes.length) return (deletedTab.innerHTML = "<h4>It looks like you dont have any deleted files yet</h4>");

  deletedTab.innerHTML = "<h2>Deleted Notes</h2><article></article>";

  for (const note of deletedNotes) generateCard(deletedTab.querySelector("article"), note, true);
}

function createPages() {
  createNotePage();
  createFavoritePage();
  createDeletedPage();
}

function generateCard(container, note, recoverOnClick) {
  container.innerHTML += `
      <div ${recoverOnClick ? `onclick="recoverNote(${note.id})"` : `onclick="openEditor(${note.id})"`}>
        <h3>${note.title || "Untilted"}</h3>
        <p>${note.text}</p>
      </div>`;
}

function init() {
  createPages();
  updateId();
}

init();
