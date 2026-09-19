const fileInput =
  document.getElementById("fileInput");

const notesInput =
  document.getElementById("notesInput");

const subjectInput =
  document.getElementById("subjectInput");

const startBtn =
  document.getElementById("startBtn");

const message =
  document.getElementById("message");


// ===============================
// LOAD TEXT FILE
// ===============================

fileInput.addEventListener(
  "change",
  () => {

    const file =
      fileInput.files[0];

    if (!file) {
      return;
    }


    const reader =
      new FileReader();


    reader.onload = event => {

      notesInput.value =
        event.target.result;


      message.textContent =
        `${file.name} loaded successfully.`;


      message.style.color =
        "#18835a";

    };


    reader.readAsText(file);

  }
);


// ===============================
// START REVISION
// ===============================

startBtn.addEventListener(
  "click",
  () => {

    const notes =
      notesInput.value.trim();


    const subject =
      subjectInput.value.trim() ||
      "My Study Notes";


    if (notes.length < 30) {

      message.textContent =
        "Please add at least a few sentences of notes.";

      message.style.color =
        "#c84d4d";

      return;

    }


    const data =
      buildStudyData(
        notes,
        subject
      );


    saveData(data);


    message.textContent =
      "Your notes are ready!";

    message.style.color =
      "#18835a";


    setTimeout(() => {

      location.href =
        "study.html";

    }, 300);

  }
);
