const joi = require('joi');


const id = joi.string().alphanum().min(20).max(20);

const answer = joi.string();

const question = joi.string();

const createQuestionDTO = joi.object({
    answer: answer.required(),
    question: question.required(),
});

const updateQuestionDTO = joi.object({
    answer,
    question,
});

const getQuestionDTO = joi.object({
    id: id.required(),
})

module.exports = {
    createQuestionDTO,
    updateQuestionDTO,
    getQuestionDTO,
  };