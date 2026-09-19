const data =
  ensureData();


let questions =
  [...data.questions];


const selectedTopic =
  localStorage.getItem(
    "selectedTopic"
  );


// Put selected topic questions first
if (
  selectedTopic &&
  questions.some(
    q => q.topic === selectedTopic
  )
) {

  const selected =
    questions.filter(
      q => q.topic === selectedTopic
    );


  const other =
    questions.filter(
      q => q.topic !== selectedTopic
    );


  questions =
    [...selected, ...other]
      .slice(0, 5);

} else {

  questions =
    questions.slice(0, 5);

}


let current = 0;
let score = 0;
let selected = null;

const wrongTopics = [];


// ===============================
// ELEMENTS
// ===============================

const questionText =
  document.getElementById(
    "questionText"
  );

const optionsEl =
  document.getElementById(
    "options"
  );

const submitBtn =
  document.getElementById(
    "submitBtn"
  );

const feedback =
  document.getElementById(
    "feedback"
  );


// ===============================
// RENDER
// ===============================

function render() {

  if (current >= questions.length) {

    finish();

    return;

  }


  const item =
    questions[current];


  selected = null;


  submitBtn.disabled =
    true;


  submitBtn.textContent =
    "Submit Answer";


  submitBtn.onclick =
    checkAnswer;


  feedback.textContent =
    "";


  document.getElementById(
    "questionTopic"
  ).textContent =
    item.topic;


  document.getElementById(
    "quizProgress"
  ).textContent =
    `${current + 1} / ${questions.length}`;


  document.getElementById(
    "quizBar"
  ).style.width =
    `${(current / questions.length) * 100}%`;


  questionText.textContent =
    item.question;


  optionsEl.innerHTML =
    "";


  item.options.forEach(
    (option, index) => {

      const button =
        document.createElement(
          "button"
        );


      button.className =
        "option";


      button.textContent =
        option;


      button.onclick = () => {

        document
          .querySelectorAll(
            ".option"
          )
          .forEach(
            x =>
              x.classList.remove(
                "selected"
              )
          );


        button.classList.add(
          "selected"
        );


        selected =
          index;


        submitBtn.disabled =
          false;

      };


      optionsEl.appendChild(
        button
      );

    }
  );

}


// ===============================
// CHECK ANSWER
// ===============================

function checkAnswer() {

  if (selected === null) {
    return;
  }


  const item =
    questions[current];


  const buttons =
    [
      ...document.querySelectorAll(
        ".option"
      )
    ];


  buttons.forEach(
    (button, index) => {

      button.disabled =
        true;


      if (
        index === item.answer
      ) {

        button.classList.add(
          "correct"
        );

      }


      if (
        index === selected &&
        selected !== item.answer
      ) {

        button.classList.add(
          "wrong"
        );

      }

    }
  );


  const progress =
    data.progress[item.topic] || {
      correct: 0,
      total: 0
    };


  progress.total++;


  if (
    selected === item.answer
  ) {

    score++;

    progress.correct++;

    data.xp += 10;


    feedback.textContent =
      "✓ Correct! +10 XP";


    feedback.style.color =
      "#18835a";

  } else {

    wrongTopics.push(
      item.topic
    );


    feedback.textContent =
      `✗ Not quite. Correct answer: ${item.options[item.answer]}`;


    feedback.style.color =
      "#b44a4a";

  }


  data.progress[item.topic] =
    progress;


  saveData(data);


  submitBtn.textContent =
    current === questions.length - 1
      ? "See Results"
      : "Next Question →";


  submitBtn.onclick = () => {

    current++;

    render();

  };

}


// ===============================
// FINISH
// ===============================

function finish() {

  data.sessions++;


  const percent =
    questions.length
      ? Math.round(
          (score / questions.length) * 100
        )
      : 0;


  data.bestScore =
    Math.max(
      data.bestScore || 0,
      percent
    );


  data.xp +=
    percent >= 80
      ? 20
      : 5;


  saveData(data);


  document
    .getElementById(
      "quizBox"
    )
    .classList.add(
      "hidden"
    );


  document
    .getElementById(
      "resultBox"
    )
    .classList.remove(
      "hidden"
    );


  document.getElementById(
    "finalScore"
  ).textContent =
    percent;


  document.getElementById(
    "scoreText"
  ).textContent =
    `You got ${score} out of ${questions.length} questions correct.`;


  const counts = {};


  wrongTopics.forEach(
    topic => {

      counts[topic] =
        (counts[topic] || 0) + 1;

    }
  );


  const list =
    document.getElementById(
      "weakList"
    );


  list.innerHTML =
    Object.keys(counts).length

      ? "<h3>Topics to revise</h3>"

      : "<h3>Great! No weak topics in this quiz 🎉</h3>";


  Object.keys(counts).forEach(
    topic => {

      const div =
        document.createElement(
          "div"
        );


      div.className =
        "weak-item";


      div.textContent =
        `${topic} — ${counts[topic]} question${
          counts[topic] > 1
            ? "s"
            : ""
        } missed`;


      list.appendChild(
        div
      );

    }
  );

}


// ===============================
// START
// ===============================

if (questions.length > 0) {

  render();

} else {

  questionText.textContent =
    "No quiz questions available for these notes.";

  submitBtn.disabled =
    true;

}
