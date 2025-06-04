# CV Generator

A React-based web application that allows users to create a professional CV (Curriculum Vitae) through a simple and interactive interface. Users can input personal details, education, experience, and skills, preview them live, and persist the data in local storage.

## ✨ Features

- Input and validate personal information, education, work experience, and skills.

- Real-time CV preview component.

- Client-side form validation (email and phone).

- Local storage persistence of entered data.

- Edit and delete functionality for each CV entry.

- Minimal UI using plain CSS.

## 🛠️ Built With

- [React](https://reactjs.org/) — Functional components & hooks

- HTML/CSS — Custom styling

- Local Storage — For data persistence

## 📂 Project Structure

cv-generator/

├── public/

│ └── index.html

├── src/

│ ├── components/

│ │ ├── Header.js

│ │ ├── CVForm.js

│ │ ├── CVPreview.js

│ │ ├── Header.css

│ │ ├── CVForm.css

│ │ └── CVPreview.css

│ ├── App.js

│ └── index.js

├── package.json

└── README.md

## 🧪 Validations

- **Email:** Must be a valid email format.

- **Phone:** Must follow the format `##-####-####`.

- Required fields must be filled to proceed.

## 🔧 Installation & Running Locally

npm install

npm start

Then navigate to http://localhost:3000/ in your browser.

📦 Dependencies

React (^18)

React DOM

Webpack / Create React App