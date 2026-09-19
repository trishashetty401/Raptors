const defaultData = {
  subject: "",
  notes: "",
  topics: [],
  flashcards: [],
  questions: [],
  progress: {},
  xp: 0,
  bestScore: 0,
  cardsReviewed: 0,
  sessions: 0,
  weakTopics: []
};


// ===============================
// TOPIC RULES
// ===============================

const topicRules = {

  "Atomic Structure": [
    "atomic structure",
    "atom",
    "nucleus",
    "electron",
    "proton",
    "neutron"
  ],

  "Atomic Number": [
    "atomic number",
    "number of protons",
    "neutral atom"
  ],

  "Mass Number": [
    "mass number",
    "protons and neutrons"
  ],

  "Isotopes": [
    "isotope",
    "isotopes",
    "same element",
    "different mass numbers"
  ],

  "Bohr Model": [
    "bohr model",
    "bohr",
    "fixed circular orbits",
    "energy levels"
  ],

  "Orbitals": [
    "orbital",
    "orbitals",
    "quantum mechanical model",
    "probability of finding"
  ],

  "Types of Orbitals": [
    "s orbital",
    "p orbital",
    "d orbital",
    "f orbital",
    "types of atomic orbitals"
  ],

  "Electronic Configuration": [
    "electronic configuration",
    "electron configuration",
    "electrons are distributed",
    "distributed among the orbitals"
  ],

  "Aufbau Principle": [
    "aufbau principle",
    "increasing energy",
    "lower-energy orbitals"
  ],

  "Pauli Exclusion Principle": [
    "pauli exclusion principle",
    "maximum of two electrons",
    "opposite spins"
  ],

  "Hund's Rule": [
    "hund's rule",
    "hund rule",
    "degenerate orbitals",
    "pairing takes place"
  ],

  "Valence Electrons": [
    "valence electrons",
    "outermost shell",
    "chemical bonding",
    "chemical reactions"
  ]

};


// ===============================
// SAVE DATA
// ===============================

function saveData(data) {

  localStorage.setItem(
    "reviseXData",
    JSON.stringify(data)
  );

}


// ===============================
// LOAD DATA
// ===============================

function loadData() {

  const saved =
    localStorage.getItem("reviseXData");

  if (!saved) {

    return JSON.parse(
      JSON.stringify(defaultData)
    );

  }

  return JSON.parse(saved);

}


// ===============================
// DETECT TOPICS
// ===============================

function detectTopics(notes) {

  const text =
    notes.toLowerCase();

  const detected = [];

  for (const topic in topicRules) {

    const keywords =
      topicRules[topic];

    let matches = 0;

    keywords.forEach(keyword => {

      if (
        text.includes(
          keyword.toLowerCase()
        )
      ) {

        matches++;

      }

    });


    if (matches > 0) {

      detected.push({
        name: topic,
        score: matches
      });

    }

  }


  detected.sort(
    (a, b) => b.score - a.score
  );


  return detected.map(
    item => item.name
  );

}


// ===============================
// SPLIT NOTES
// ===============================

function extractSentences(notes) {

  return notes
    .replace(/\n+/g, " ")
    .split(/[.!?]/)
    .map(sentence =>
      sentence.trim()
    )
    .filter(sentence =>
      sentence.length > 25
    );

}


// ===============================
// FIND SENTENCES FOR TOPIC
// ===============================

function getRelatedSentences(
  notes,
  topic
) {

  const sentences =
    extractSentences(notes);

  const keywords =
    topicRules[topic] || [];


  return sentences.filter(sentence => {

    const text =
      sentence.toLowerCase();

    return keywords.some(keyword =>
      text.includes(
        keyword.toLowerCase()
      )
    );

  });

}


// ===============================
// GENERATE FLASHCARDS
// ===============================

function generateFlashcards(
  notes,
  topics
) {

  const cards = [];


  topics.forEach(topic => {

    const sentences =
      getRelatedSentences(
        notes,
        topic
      );


    if (sentences.length === 0) {
      return;
    }


    cards.push({

      topic: topic,

      question:
        `What is ${topic}?`,

      answer:
        sentences[0]

    });

  });


  return cards;

}


// ===============================
// GENERATE QUIZ
// ===============================

function generateQuestions(
  notes,
  topics
) {

  const questions = [];


  topics.forEach(topic => {

    const sentences =
      getRelatedSentences(
        notes,
        topic
      );


    if (sentences.length === 0) {
      return;
    }


    const correctAnswer =
      sentences[0];


    questions.push({

      topic: topic,

      question:
        `According to your notes, what is ${topic}?`,

      options: [

        correctAnswer,

        "It is unrelated to the topic.",

        "It is used only in electrical circuits.",

        "It is a type of computer network."

      ],

      answer: 0

    });

  });


  return questions;

}


// ===============================
// BUILD STUDY DATA
// ===============================

function buildStudyData(
  notes,
  subject
) {

  const topics =
    detectTopics(notes);


  const flashcards =
    generateFlashcards(
      notes,
      topics
    );


  const questions =
    generateQuestions(
      notes,
      topics
    );


  const progress = {};


  topics.forEach(topic => {

    progress[topic] = {
      correct: 0,
      total: 0
    };

  });


  return {

    subject:
      subject || "My Study Notes",

    notes:
      notes,

    topics:
      topics,

    flashcards:
      flashcards,

    questions:
      questions,

    progress:
      progress,

    xp: 0,

    bestScore: 0,

    cardsReviewed: 0,

    sessions: 1,

    weakTopics: []

  };

}


// ===============================
// ENSURE DATA
// ===============================

function ensureData() {

  const data =
    loadData();


  if (!data.notes) {

    return {
      ...defaultData
    };

  }


  return data;

}
