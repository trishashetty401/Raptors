# ReviseX

### Turn Your Notes into Active Revision

ReviseX is an interactive learning web application that helps students convert their study notes into a structured revision experience.

Instead of only reading notes, students can use their notes to create topics, flashcards, quizzes, and revision activities.

## Features

* 📝 **Notes Input** – Paste study notes or upload a `.txt` file.
* 📚 **Topic Extraction** – Identifies important topics from the notes.
* 🃏 **Flashcards** – Converts study content into question-and-answer flashcards.
* 🧠 **Practice Quiz** – Tests the user's understanding and calculates the score.
* 🎯 **Weak Topic Tracking** – Helps identify topics that need more revision.
* 💬 **Teach Back Mode** – Students explain a topic in their own words and receive feedback based on important concepts from the notes.
* 📊 **Progress Dashboard** – Displays learning progress, XP, quiz performance, and revision information.
* 💾 **Local Storage** – Saves learning data in the browser.

## How It Works

```text
Study Notes
     ↓
Topic Extraction
     ↓
Flashcards
     ↓
Practice Quiz
     ↓
Weak Topic Detection
     ↓
Teach Back
     ↓
Revision
```

## Technologies Used

* HTML5
* CSS3
* JavaScript
* LocalStorage

## Project Structure

```text
ReviseX/
│
├── index.html
├── notes.html
├── study.html
├── flashcards.html
├── quiz.html
├── teach.html
├── dashboard.html
│
├── css/
│   └── style.css
│
├── js/
│   ├── data.js
│   ├── notes.js
│   ├── study.js
│   ├── flashcards.js
│   ├── quiz.js
│   ├── teach.js
│   └── dashboard.js
│
└── README.md
```

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/trishashetty401/Raptors.git
```

### 2. Open the project

```bash
cd Raptors
```

### 3. Run the application

Open `index.html` in a web browser.

No backend server or database is required.

## Team Contributions

The project is divided into different modules so that each team member contributes to a specific part of the application.

| Member                     | Contribution                                                         |
| -------------------------- | -------------------------------------------------------------------- |
| Dhanvi Keshava             | Notes input, file upload, topic extraction and study-data generation |
| Trisha Durgaprasad Shetty | Flashcards and revision interaction                                   |
| Bhavish Kulal              | Quiz, scoring and weak-topic tracking                                |
| Karthik S Bhagwath         | Teach Back, dashboard and UI improvements                            |

## Unique Feature

### Teach Back Mode

Teach Back Mode allows students to explain a topic in their own words.

ReviseX checks the explanation against important concepts found in the study material and gives simple feedback about the concepts that were covered or missed.

This encourages students to actively recall and explain what they have learned instead of only rereading their notes.

## Purpose

The goal of ReviseX is to make revision more active, interactive, and easier to track by transforming existing study material into multiple learning activities.

## Future Improvements

* PDF and DOCX note support
* More advanced topic extraction
* AI-based question generation
* Cloud-based progress synchronization
* User accounts
* More detailed analytics
* Spaced-repetition based revision
