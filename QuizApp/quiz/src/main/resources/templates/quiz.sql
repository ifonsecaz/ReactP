create database quiz;

use quiz;

create table question(
	question_id bigint primary key auto_increment,
    question varchar(300) not null,
    option0 varchar(200),
    option1 varchar(200),
    option2 varchar(200),
    option3 varchar(200),
    correct_answer int not null
);

INSERT INTO question (question, option0, option1, option2, option3, correct_answer) VALUES 
('What does SQL stand for?', 'Structured Query Language', 'Simple Query Language', 'Standard Query Language', 'System Query Language', 1),
('Which of these is NOT a programming paradigm?', 'Object-Oriented', 'Functional', 'Procedural', 'Hypothetical', 4),
('What is the correct way to declare a JavaScript variable?', 'variable x;', 'var x;', 'let x;', 'Both 2 and 3', 4),
('What is the capital of France?', 'Berlin', 'Madrid', 'Paris', 'Rome', 3),
('Which planet is known as the Red Planet?', 'Venus', 'Mars', 'Jupiter', 'Saturn', 2),
('What is the chemical symbol for gold?', 'Go', 'Gd', 'Au', 'Ag', 3),
('What is the powerhouse of the cell?', 'Nucleus', 'Mitochondria', 'Ribosome', 'Endoplasmic Reticulum', 2),
('What does "HTTP" stand for?', 'HyperText Transfer Protocol', 'High Transfer Text Protocol', 'Hyper Transfer Text Protocol', 'HyperText Transmission Protocol', 1),
('Which company developed the Java programming language?', 'Microsoft', 'Sun Microsystems', 'Oracle', 'Google', 2),
('What is the value of π (pi) rounded to two decimal places?', '3.12', '3.14', '3.16', '3.18', 2);

select * from question;