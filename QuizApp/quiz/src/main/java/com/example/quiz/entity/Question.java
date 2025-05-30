package com.example.quiz.entity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Question {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private long question_id;
    @Column(nullable = false)
    private String question;
    private String option0;
    private String option1;
    private String option2;
    private String option3;
    @Column(nullable = false)
    private int correct_answer;

    public Question() {
        
    }

    public Question(String question, String optiona, String optionb, String optionc, String optiond, int correct_answer) {
        this.question = question;
        this.option0 = optiona;
        this.option1 = optionb;
        this.option2 = optionc;
        this.option3 = optiond;
        this.correct_answer = correct_answer;
    }

    public long getQuestion_id() {
        return question_id;
    }
    public String getQuestion() {
        return question;
    }

    public void setQuestion(String question) {
        this.question = question;
    }

    public String getOption0() {
        return option0;
    }

    public void setOption0(String optiona) {
        this.option0 = optiona;
    }

    public String getOption1() {
        return option1;
    }

    public void setOption1(String optionb) {
        this.option1 = optionb;
    }

    public String getOption2() {
        return option2;
    }

    public void setOption2(String optionc) {
        this.option2 = optionc;
    }

    public String getOption3() {
        return option3;
    }

    public void setOption3(String optiond) {
        this.option3 = optiond;
    }

    public int getCorrect_answer() {
        return correct_answer;
    }

    public void setCorrect_answer(int correct_answer) {
        this.correct_answer = correct_answer;
    }

}
