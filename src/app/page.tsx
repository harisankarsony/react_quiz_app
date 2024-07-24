"use client"

import React, { ChangeEvent, useState } from "react";
import { Question } from "./components/QuestionComponent";
import { questions } from "./questions";
import { Results } from "./components/Results";
import { BUTTON_NAME_NEXT, BUTTON_NAME_PREVIOUS, BUTTON_NAME_RESTART, BUTTON_TEXT_NEXT, BUTTON_TEXT_PREVIOUS, BUTTON_TEXT_RESTART, BUTTON_TEXT_SUBMIT } from "./constants";

export default function Home() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState(Object);
  const [buttonText, setButtonText] = useState(BUTTON_TEXT_NEXT);
  const [showResult, setShowResult] = useState(false);

  function changeQuestion(buttonName: string) {
    if (buttonName === BUTTON_NAME_PREVIOUS) {
      setCurrentQuestion((currentQuestion) => currentQuestion - 1);
      setButtonText(BUTTON_TEXT_NEXT);
    }

    if (buttonName === BUTTON_NAME_NEXT) {
      if (currentQuestion == questions.length - 1)
        setShowResult(true);
      else {
        if (currentQuestion === questions.length - 2) {
          setButtonText(BUTTON_TEXT_SUBMIT);
        }
        setCurrentQuestion((currentQuestion) => currentQuestion + 1);
      }
    }

    if (buttonName === BUTTON_NAME_RESTART) {
      setCurrentQuestion(0);
      setSelectedAnswers({});
      setButtonText(BUTTON_TEXT_NEXT);
      setShowResult(false);
    }
  }

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    setSelectedAnswers({ ...selectedAnswers, [currentQuestion]: e.target.value })
  }

  function calculateResult() {
    let calculatedResult = 0
    for (let i = 0; i < questions.length; i++) {
      if (selectedAnswers[i] === questions[i].correctAnswer) {
        calculatedResult++;
      }
    }
    return calculatedResult;
  }


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
              <Question question={questions[currentQuestion]} onInputChange={handleInputChange} selected={selectedAnswers[currentQuestion]} />
              <div className="flex justify-center space-x-4 mt-4">
                {currentQuestion !== 0 && <button className="bg-gray-200 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded disabled:opacity-60" onClick={() => changeQuestion(BUTTON_NAME_PREVIOUS)} >{BUTTON_TEXT_PREVIOUS}</button>}
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-60" onClick={() => changeQuestion(BUTTON_NAME_NEXT)} disabled={!(currentQuestion in selectedAnswers)}>{buttonText}</button>
              </div>
            </>}
        </div>
      </div>
    </div>
  );
}

// TODO:
//git push
//rest of the stuff in confluence
