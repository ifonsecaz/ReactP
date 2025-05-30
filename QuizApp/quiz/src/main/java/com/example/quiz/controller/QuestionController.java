package com.example.quiz.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.quiz.service.QuestionService;
import com.example.quiz.entity.*;

import javax.validation.Valid;

@RestController
public class QuestionController {
    @Autowired private QuestionService questionService;

    @PostMapping("/question")
    public ResponseEntity<?> saveQuestion(
        @Valid @RequestBody Question question)
    {
        Question res=questionService.saveQuestion(question);
        if(res!=null){
            return ResponseEntity.status(HttpStatus.CREATED).body(res);
        }
        else{
            return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body("Verify the data");
        }
    }


    @GetMapping("/questions")
    public ResponseEntity<?> fetchQuestionList()
    {
        return ResponseEntity.status(HttpStatus.OK).body(questionService.fetchQuestionList());
    }

    @GetMapping("/questions/{id}")
    @CrossOrigin(origins = "http://127.0.0.1:5500") //port where frontend runs
    public ResponseEntity<?> fetchQuestionById(@PathVariable("id") Long questionId)
    {
        Question res=questionService.fetchQuestionByID(questionId);
        if(res!=null){
            return ResponseEntity.status(HttpStatus.OK).body(res);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("The provided ID couldnt be found");
    }

    @GetMapping("/questions/cont")
    @CrossOrigin(origins = "http://127.0.0.1:5500")
    public ResponseEntity<?> fetchQuestionNum()
    {
        return ResponseEntity.status(HttpStatus.OK).body(questionService.fetchQuestionNum());
    }
 
    @PutMapping("/update/questions/{id}")
    public ResponseEntity<?>
    updateProduct(@Valid @RequestBody Question question,
                     @PathVariable("id") Long questionId)
    {
        Question res= questionService.updateQuestion(question, questionId);
        if(res!=null){
            return ResponseEntity.status(HttpStatus.CREATED).body(res);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("The provided ID couldnt be found");
    }
    

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteTask(@PathVariable long questionId){
        questionService.deleteQuestion(questionId);
        return ResponseEntity.status(HttpStatus.OK).body("Deleted succesfully");

    }
}
