const data =
  ensureData();


const select =
  document.getElementById(
    "teachTopic"
  );

const answer =
  document.getElementById(
    "teachAnswer"
  );

const result =
  document.getElementById(
    "teachResult"
  );


// ===============================
// CREATE CONCEPTS FROM TOPICS
// ===============================

function getConcepts(topic) {

  const notes =
    data.notes.toLowerCase();


  const sentences =
    extractSentences(
      data.notes
    );


  const related =
    getRelatedSentences(
      data.notes,
      topic
    );


  const words = [];


  related.forEach(sentence => {

    const cleanWords =
      sentence
        .toLowerCase()
        .replace(
          /[^a-zA-Z0-9\s-]/g,
          ""
        )
        .split(/\s+/);


    cleanWords.forEach(word => {

      if (
        word.length >= 5 &&
        !words.includes(word)
      ) {

        words.push(word);

      }

    });

  });


  return words.slice(0, 8);

}


// ===============================
// ADD TOPICS
// ===============================

data.topics.forEach(topic => {

  const option =
    document.createElement(
      "option"
    );


  option.value =
    topic;


  option.textContent =
    topic;


  select.appendChild(
    option
  );

});


// ===============================
// CHECK EXPLANATION
// ===============================

document
  .getElementById(
    "checkBtn"
  )
  .onclick = () => {

    const topic =
      select.value;


    const text =
      answer.value
        .toLowerCase()
        .trim();


    if (
      text.length < 10
    ) {

      result.className =
        "teach-result";


      result.innerHTML =
        "<b>Please write a little more before checking.</b>";


      return;

    }


    const concepts =
      getConcepts(topic);


    const found =
      concepts.filter(
        word =>
          text.includes(word)
      );


    const missing =
      concepts.filter(
        word =>
          !text.includes(word)
      );


    const percent =
      concepts.length
        ? Math.round(
            (found.length /
              concepts.length) *
              100
          )
        : 0;


    result.className =
      "teach-result";


    result.innerHTML = `

      <h3>
        ${
          percent >= 60
            ? "Good explanation! 🎉"
            : "Keep revising this topic."
        }
      </h3>

      <p>
        Important concepts covered:
        <b>
          ${found.length}/${concepts.length}
        </b>
      </p>

      <div class="concepts">

        ${
          found
            .map(
              word =>
                `<span class="concept found">
                  ✓ ${word}
                </span>`
            )
            .join("")
        }

        ${
          missing
            .map(
              word =>
                `<span class="concept missing">
                  ⚠️ ${word}
                </span>`
            )
            .join("")
        }

      </div>

      <p>
        <small>
          ReviseX checks your explanation against
          important words found in your study notes.
        </small>
      </p>

    `;


    data.xp +=
      percent >= 60
        ? 15
        : 5;


    saveData(data);

  };
