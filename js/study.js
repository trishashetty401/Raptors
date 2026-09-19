const data =
  ensureData();


// ===============================
// SUBJECT
// ===============================

const subjectElement =
  document.getElementById(
    "studySubject"
  );

if (subjectElement) {

  subjectElement.textContent =
    data.subject;

}


// ===============================
// NOTE LENGTH
// ===============================

const noteLength =
  document.getElementById(
    "noteLength"
  );

if (noteLength) {

  noteLength.textContent =
    data.notes.length;

}


// ===============================
// TOPIC COUNT
// ===============================

const topicCount =
  document.getElementById(
    "topicCount"
  );

if (topicCount) {

  topicCount.textContent =
    data.topics.length;

}


// ===============================
// FLASHCARD COUNT
// ===============================

const cardCount =
  document.getElementById(
    "cardCount"
  );

if (cardCount) {

  cardCount.textContent =
    data.flashcards.length;

}


// ===============================
// QUIZ COUNT
// ===============================

const quizCount =
  document.getElementById(
    "quizCount"
  );

if (quizCount) {

  quizCount.textContent =
    data.questions.length;

}


// ===============================
// TOPIC LIST
// ===============================

const topicContainer =
  document.getElementById(
    "topicList"
  );


if (topicContainer) {

  topicContainer.innerHTML = "";


  if (data.topics.length === 0) {

    topicContainer.innerHTML =
      "<p>No topics detected from these notes.</p>";

  } else {

    data.topics.forEach(topic => {

      const button =
        document.createElement(
          "button"
        );


      button.className =
        "topic-pill";


      button.textContent =
        topic;


      button.onclick = () => {

        localStorage.setItem(
          "selectedTopic",
          topic
        );


        location.href =
          "quiz.html";

      };


      topicContainer.appendChild(
        button
      );

    });

  }

}
