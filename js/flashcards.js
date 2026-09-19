const data = ensureData();

let cards = [...data.flashcards];

let current = 0;
let showingAnswer = false;


// ===============================
// HTML ELEMENTS
// ===============================

const cardTopic =
  document.getElementById("cardTopic");

const cardQuestion =
  document.getElementById("cardQuestion");

const cardAnswer =
  document.getElementById("cardAnswer");

const cardNumber =
  document.getElementById("cardNumber");

const totalCards =
  document.getElementById("totalCards");

const answerBox =
  document.getElementById("answerBox");

const showAnswerBtn =
  document.getElementById("showAnswer");

const nextCardBtn =
  document.getElementById("nextCard");

const ratingButtons =
  document.querySelectorAll(".rate");


// ===============================
// RENDER CARD
// ===============================

function renderCard() {

  if (cards.length === 0) {

    cardQuestion.textContent =
      "No flashcards available.";

    cardAnswer.textContent =
      "Please add more notes.";

    cardTopic.textContent = "";

    cardNumber.textContent = "0";

    totalCards.textContent = "0";

    return;
  }


  const card = cards[current];

  showingAnswer = false;


  // Topic
  cardTopic.textContent =
    card.topic || "General";


  // Question
  cardQuestion.textContent =
    card.question || "";


  // Answer
  cardAnswer.textContent =
    card.answer || "";


  // Hide answer
  answerBox.classList.add("hidden");


  // Reset show answer button
  showAnswerBtn.textContent =
    "Show Answer";


  // Counter
  cardNumber.textContent =
    current + 1;

  totalCards.textContent =
    cards.length;
}


// ===============================
// SHOW ANSWER
// ===============================

showAnswerBtn.onclick = () => {

  showingAnswer = !showingAnswer;


  if (showingAnswer) {

    answerBox.classList.remove("hidden");

    showAnswerBtn.textContent =
      "Hide Answer";

  } else {

    answerBox.classList.add("hidden");

    showAnswerBtn.textContent =
      "Show Answer";
  }
};


// ===============================
// REVIEW CARD
// ===============================

function reviewCard(points) {

  data.xp += points;

  data.cardsReviewed++;

  saveData(data);


  if (current < cards.length - 1) {

    current++;

    renderCard();

  } else {

    cardQuestion.textContent =
      "Session complete! 🎉";

    cardAnswer.textContent =
      "You reviewed all your flashcards.";

    answerBox.classList.remove("hidden");

    showAnswerBtn.style.display =
      "none";

    nextCardBtn.style.display =
      "none";

  }
}


// ===============================
// RATING BUTTONS
// ===============================

ratingButtons.forEach(button => {

  button.onclick = () => {

    const rating =
      button.dataset.rate;


    if (rating === "again") {

      reviewCard(5);

    } else if (rating === "hard") {

      reviewCard(8);

    } else if (rating === "easy") {

      reviewCard(10);

    }

  };

});


// ===============================
// NEXT CARD
// ===============================

nextCardBtn.onclick = () => {

  if (current < cards.length - 1) {

    current++;

    renderCard();

  } else {

    cardQuestion.textContent =
      "Session complete! 🎉";

    cardAnswer.textContent =
      "You reviewed all your flashcards.";

    answerBox.classList.remove("hidden");

    showAnswerBtn.style.display =
      "none";

    nextCardBtn.style.display =
      "none";

  }

};


// ===============================
// START
// ===============================

renderCard();
