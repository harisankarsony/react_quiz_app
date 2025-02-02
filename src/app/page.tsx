"use client"

import React, { ChangeEvent, useEffect, useRef } from "react";
import { Question } from "./components/QuestionComponent";
import { Results } from "./components/Results";
import { BUTTON_NAME_NEXT, BUTTON_NAME_RESTART, BUTTON_TEXT_NEXT, BUTTON_TEXT_RESTART, BUTTON_TEXT_SUBMIT, quizApi, STATUS_LOADED, STATUS_LOADING } from "./constants";
import { useReactiveVar } from "@apollo/client";
import { buttonTextVar, currentQuestionVar, selectedAnswersVar, showResultVar, timeLeftVar, questionsVar, loadingStatusVar } from "./reactive_variable";
import axios from "axios";

export default function Home() {
  const currentQuestion = useReactiveVar(currentQuestionVar);
  const showResult = useReactiveVar(showResultVar);
  const selectedAnswers = useReactiveVar(selectedAnswersVar);
  const buttonText = useReactiveVar(buttonTextVar);
  const timeLeft = useReactiveVar(timeLeftVar);
  const questions = useReactiveVar(questionsVar);
  const loadingStatus = useReactiveVar(loadingStatusVar);

  function changeQuestion(buttonName: string) {
    if (buttonName === BUTTON_NAME_NEXT) {
      if (currentQuestion == questions.length - 1)
        showResultVar(true);
      else {
        if (currentQuestion === questions.length - 2) {
          buttonTextVar(BUTTON_TEXT_SUBMIT);
        }
        currentQuestionVar(currentQuestion + 1);
      }
    }
    if (buttonName === BUTTON_NAME_RESTART) {
      currentQuestionVar(0);
      selectedAnswersVar([]);
      buttonTextVar(BUTTON_TEXT_NEXT);
      showResultVar(false);
      fetchQuestions();
    }
  }

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    selectedAnswersVar([...selectedAnswers, e.target.value])
  }

  type AnswerKey = 'answer_a' | 'answer_b' | 'answer_c' | 'answer_d' | 'answer_e' | 'answer_f';
  type Answers = Record<AnswerKey, string | null>;
  type CorrectAnswers = Record<AnswerKey, string>;

  function calculateResult(): number {
    let calculatedResult = 0;

    for (const element in selectedAnswers) {
      if (questions[element]) {
        if (selectedAnswers[element] === getCorrectAnswer(questions[element].answers, questions[element].correct_answers)) {
          calculatedResult++;
        }
      }
    }
    return calculatedResult;
  }

  function getCorrectAnswer(answers: Answers, correct_answers: CorrectAnswers): string | null {
    for (const key in correct_answers) {
      if (correct_answers[key as AnswerKey] === "true") {
        const answerKey = key.replace('_correct', '') as AnswerKey;
        return answers[answerKey];
      }
    }
    return null;
  }


  async function fetchQuestions() {
    loadingStatusVar(STATUS_LOADING);
    const response = await axios.get(quizApi);
    questionsVar(response.data);
    loadingStatusVar(STATUS_LOADED);
  }

  useEffect(() => {
    if (timeLeft === 0) {
      changeQuestion(BUTTON_NAME_NEXT);
    }
    const timer = setInterval(() => {
      timeLeftVar(timeLeft > 0 ? timeLeft - 1 : 0);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  useEffect(() => {
    timeLeftVar(10);
  }, [currentQuestion]);

  const effectRan = useRef(false);
  useEffect(() => {
    if (!effectRan.current)
      fetchQuestions();
    effectRan.current = true;
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div>
        <h1 className="text-center text-2xl font-bold mb-7 text-blue-500">Quiz App</h1>
        <div className="outline-2 outline p-7">
          {showResult ?
            <div className="text-center">
              <Results result={calculateResult()} totalQuestions={questions.length} />
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-60 my-2" onClick={() => changeQuestion(BUTTON_NAME_RESTART)} >{BUTTON_TEXT_RESTART}</button>
            </div> :
            <>
              {loadingStatus === STATUS_LOADED ?
                <>
                  <Question question={questions[currentQuestion]} onInputChange={handleInputChange} id={currentQuestion + 1} totalQuestions={questions.length} />
                  <div className="flex justify-center items-center space-x-4 mt-4">
                    <p>Time left: <label className="time-left font-semibold" style={timeLeft > 5 ? { color: "green" } : { color: "red" }}>{timeLeft} seconds</label></p>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-60" onClick={() => changeQuestion(BUTTON_NAME_NEXT)} disabled={!(currentQuestion in selectedAnswers)}>{buttonText}</button>
                  </div>
                </> :
                <div className="text-blue-500 font-semibold italic">loading...</div>}
            </>}
        </div>
      </div>
    </div>
  );
}