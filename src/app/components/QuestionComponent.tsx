import { ChangeEvent } from "react";

type Question = {
    question: string;
    answers: { [key: string]: string };
}

type QuestionComponent = {
    question: Question;
    id: number;
    onInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
    totalQuestions: number;
};

export const Question: React.FC<QuestionComponent> = ({ question, onInputChange, id, totalQuestions }) => {
    return (
        <>
            <div className="font-bold pb-1">Question: {id}/{totalQuestions}</div>
            <div className="italic pb-1 font-semibold">{question.question}</div>
            <ol>{Object.keys(question.answers).map((keyName, i) => (
                question.answers[keyName] !== null &&
                <label key={question.answers[keyName]} className="block cursor-pointer hover:text-blue-500"><input type="radio" name="option" value={question.answers[keyName]} onChange={onInputChange} className="cursor-pointer" /> {question.answers[keyName]} </label>
            ))}
            </ol>
        </>
    );
}