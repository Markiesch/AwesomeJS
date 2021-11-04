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

function openTab(event, tabName, editorID) {
  createPages();

  // Activate selected tab
  for (const tab of tabs) tab.style.display = "none";
  document.querySelector("." + tabName).style.display = "flex";

  // Activate active class to clicked nav item
  for (const navItem of navItems) navItem.classList.remove("active");
  event.target.classList.add("active");

  // Check if
  if (editorID === null) return;
  titleEl.value = noteData[currentTab].title;
  textEl.value = noteData[currentTab].text;

  loadFavorite();
}

function openEditor(editorID) {
  currentTab = editorID;
  openTab(event, "editor--tab", editorID);
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
deleteEl.addEventListener("click", permDeleteNote);

function permDeleteNote(e) {
  const index = currentTab;
  if (currentTab === false) return;
  noteData.splice(index, 1);
  currentTab = false;
  openTab(e, "notes--tab");
  saveFile();
  updateId();
}

function updateId() {
  noteData.forEach((element, index) => (element.id = index));

  saveFile();
}

// Create page helpers
function createNotePage() {
  if (noteData.length == 0) return (notesTab.innerHTML = `<h4>It looks like you dont have any files</h4>`);

  notesTab.innerHTML = "";
  for (const note of noteData) {
    if (note.deleted) continue;
    generateCard(notesTab, note);
  }
}

function createFavoritePage() {
  if (noteData.length == 0) return (favoritesTab.innerHTML = `<h4>It looks like you dont have any files</h4>`);

  favoritesTab.innerHTML = "";
  for (const note of noteData) {
    if (!note.favorite) continue;
    generateCard(favoritesTab, note);
  }
}

function createDeletedPage() {
  if (!noteData.length) return (deletedTab.innerHTML = "<h4>It looks like you dont have any files</h4>");

  deletedTab.innerHTML = "";
  for (const note of noteData) {
    if (!note.deleted) continue;
    generateCard(deletedTab, note);
  }
}

function createPages() {
  createNotePage();
  createFavoritePage();
  createDeletedPage();
}

function generateCard(container, note) {
  const index = noteData.indexOf(note);
  container.innerHTML += `
      <div onclick='openEditor("${index}")'>
        <h3>${note.title.substring(0, 15)}</h3>
        <p>${note.text.substring(0, 30)}</p>
      </div>`;
}

function init() {
  createPages();
  updateId();
}

init();
