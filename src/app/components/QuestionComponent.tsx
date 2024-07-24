import { ChangeEvent } from "react";
import { questions } from "../questions";

type Question = {
    id: number;
    question: string;
    answers: Array<string>;
    correctAnswer: string;
};

type QuestionComponent = {
    question: Question;
    onInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
    selected: string;
};

export const Question: React.FC<QuestionComponent> = ({ question, onInputChange, selected }) => {
    return (
        <>
            <div className="font-bold pb-1">Question: {question.id}/{questions.length}</div>
            <div className="italic pb-1 font-semibold">{question.question}</div>
            <ol>{question.answers.map((option: string, index: number) => <li key={option} className="hover:text-blue-500"> <label><input type="radio" name="option" value={option} onChange={onInputChange} checked={selected === option} /> {option} </label></li>)}</ol>
        </>
    );
}