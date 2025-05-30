package com.example.quiz.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.quiz.repository.QuestionRepository;

import com.example.quiz.entity.*;

import java.util.List;
import java.util.Optional;

@Service
public class QuestionService {
    @Autowired 
    private QuestionRepository questionRepository;

    public Question saveQuestion(Question question){
        return questionRepository.save(question);
    }

    public List<Question> fetchQuestionList(){
        return questionRepository.findAll();
    }

    public int fetchQuestionNum(){
        return questionRepository.findAll().size();
    }

    //Read 1
    public Question fetchQuestionByID(Long questionID){
        Optional<Question> res=questionRepository.findById(questionID);
        if(res.isPresent())
            return res.get();
        return null;
    }

    //Delete
    public void deleteQuestion(Long questionID){
        questionRepository.deleteById(questionID);
    }

    //Update
    public Question updateQuestion(Question question, Long questionID){
        Question aux= questionRepository.findById(questionID).get();
        if(aux!=null){
            if(!aux.getQuestion().equals(question.getQuestion())){
                aux.setQuestion(question.getQuestion());
            }
            if(!aux.getOption0().equals(question.getOption0())){
                aux.setOption0(question.getOption0());
            }
            if(!aux.getOption1().equals(question.getOption1())){
                aux.setOption1(question.getOption1());
            }
            if(!aux.getOption2().equals(question.getOption2())){
                aux.setOption2(question.getOption2());
            }
            if(!aux.getOption3().equals(question.getOption3())){
                aux.setOption3(question.getOption3());
            }
            if(aux.getCorrect_answer()!=question.getCorrect_answer()){
                aux.setCorrect_answer(question.getCorrect_answer());
            }
        }
        return questionRepository.save(aux);
    } 
}
