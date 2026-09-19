const data =
  ensureData();


// ===============================
// BASIC STATS
// ===============================

const xp =
  document.getElementById(
    "xp"
  );

if (xp) {
  xp.textContent =
    data.xp;
}


const bestQuiz =
  document.getElementById(
    "bestQuiz"
  );

if (bestQuiz) {
  bestQuiz.textContent =
    ${data.bestScore || 0}%;
}


const cardsReviewed =
  document.getElementById(
    "cardsReviewed"
  );

if (cardsReviewed) {

  cardsReviewed.textContent =
    data.cardsReviewed || 0;

}


const sessions =
  document.getElementById(
    "sessions"
  );

if (sessions) {

  sessions.textContent =
    data.sessions || 0;

}


// ===============================
// SUBJECT
// ===============================

const subject =
  document.getElementById(
    "dashboardSubject"
  );

if (subject) {

  subject.textContent =
    data.subject;

}


// ===============================
// TOPIC PROGRESS
// ===============================

const topicProgress =
  document.getElementById(
    "topicProgress"
  );


if (topicProgress) {

  topicProgress.innerHTML =
    "";


  data.topics.forEach(topic => {

    const progress =
      data.progress[topic] || {
        correct: 0,
        total: 0
      };


    const percent =
      progress.total
        ? Math.round(
            (progress.correct /
              progress.total) *
              100
          )
        : 0;


    const div =
      document.createElement(
        "div"
      );


    div.className =
      "progress-item";


    div.innerHTML = `

      <div class="progress-header">

        <span>
          ${topic}
        </span>

        <span>
          ${percent}%
        </span>

      </div>

      <div class="progress-track">

        <div
          class="progress-fill"
          style="width:${percent}%"
        ></div>

      </div>

    `;


    topicProgress.appendChild(
      div
    );

  });

}


// ===============================
// WEAK TOPICS
// ===============================

const weakTopics =
  document.getElementById(
    "weakTopics"
  );


if (weakTopics) {

  const weak = [];


  data.topics.forEach(topic => {

    const progress =
      data.progress[topic];


    if (
      progress &&
      progress.total > 0
    ) {

      const percent =
        Math.round(
          (progress.correct /
            progress.total) *
            100
        );


      if (percent < 60) {

        weak.push(topic);

      }

    }

  });


  if (weak.length === 0) {

    weakTopics.innerHTML =
      "<p>No weak topics yet. Keep practicing! 🎉</p>";

  } else {

    weakTopics.innerHTML =
      "";


    weak.forEach(topic => {

      const div =
        document.createElement(
          "div"
        );


      div.className =
        "weak-item";


      div.textContent =
        ⚠️ ${topic};


      weakTopics.appendChild(
        div
      );

    });

  }

}


// ===============================
// RESET
// ===============================

const resetBtn =
  document.getElementById(
    "resetBtn"
  );


if (resetBtn) {

  resetBtn.onclick = () => {

    const confirmReset =
      confirm(
        "Reset all ReviseX progress?"
      );


    if (!confirmReset) {
      return;
    }


    localStorage.removeItem(
      "reviseXData"
    );


    localStorage.removeItem(
      "selectedTopic"
    );


    location.href =
      "notes.html";

  };

}
