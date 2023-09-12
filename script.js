const addBtn = document.getElementById("add");
var i = 0;

const notes = JSON.parse(localStorage.getItem("notes"));
if (notes) {
  notes.forEach((note) => {
    addNewNote(note);
  });
}
addBtn.addEventListener("click", () => {
  addNewNote();
});

function addNewNote(text = "") {
  const note = document.createElement("div");

  const colorVal = ["#67f2d1", "#ecd9dd", "#e3ba8f", "#c3ff68"];

  if (i > colorVal.length) {
    i = 0;
  } else {
    note.classList.add("note");

    note.innerHTML = `
    <div class="tools">
      <button class="edit" id="edit">
        <i class="fa-regular fa-pen-to-square"></i>
      </button>
      <button class="delete" id="delete">
        <i class="fa-solid fa-trash"></i>
      </button>
    </div>
    <div class="main hidden"></div>
    <textarea></textarea>
  `;
    const editBtn = note.querySelector(".edit");
    const deleteBtn = note.querySelector(".delete");
    const toolBar = note.querySelector(".tools");
    const main = note.querySelector(".main");
    const textArea = note.querySelector("textarea");

    textArea.value = text;

    toolBar.style.backgroundColor = colorVal[i];
    i++;

    editBtn.addEventListener("click", () => {
      main.classList.toggle("hidden");
      textArea.classList.toggle("hidden");
    });

    deleteBtn.addEventListener("click", () => {
      note.remove();
    });

    textArea.addEventListener("input", (e) => {
      const { value } = e.target;

      main.innerHTML = marked.parse(value);
    });

    document.body.appendChild(note);
  }
}
