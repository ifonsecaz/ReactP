# 🧠 Quiz App

This is a dynamic, single-page Quiz Application built with **HTML**, **CSS**, and **JavaScript**, styled using **Bootstrap**. It connects to a backend API to fetch questions and allows users to take a quiz, track correct answers, and see their final score.

---

## 🚀 Features

- 🧩 Fetches quiz questions from a Spring Boot API
- 🎯 Supports single-answer multiple-choice questions
- ✅ Tracks correct answers and displays results
- ⚡ Real-time UI updates with no page reloads
- 🔁 Allows restarting the quiz
- 🎨 Responsive design using Bootstrap 5

---

## 🛠️ Technologies Used

- HTML5
- CSS3 (with Bootstrap)
- JavaScript (ES6+)
- RESTful API (Spring Boot backend)

---

## 📂 Project Structure

├── index.html # Main UI

├── styles.css # Custom styles

├── script.js # Quiz logic and fetch calls

├── quiz #Simple Spring Boot API

├── README.md

---

## 📋 How to Run the Project

1. **Backend API Requirement**  
   Make sure your Spring Boot API is running at:

http://localhost:8080

with CORS enabled for:

http://127.0.0.1:5500

2. **Server for the Frontend Locally**  

Run VSCode Live Server

Start the Quiz

Click the "Start Questionary" button

Answer the questions

Submit your answers

See your score at the end

---

API Endpoints used

GET /questions/cont – returns the total number of questions

GET /questions/{id} – returns a question by its ID

{
 
  "question": "What is 2 + 2?",
   
  "option0": "3",

  "option1": "4",

  "option2": "5",

  "option3": "6",

  "correct_answer": 2

}

🧠 To Improve

Store progress in localStorage for session persistence