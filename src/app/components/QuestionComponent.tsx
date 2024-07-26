import { ChangeEvent } from "react";

// type Question = {
//     id: string;
//     question: string;
//     answers: Array<string>;
//     correctAnswer: string;
// };

type QuestionComponent = {
    question: any;
    id: number;
    onInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
    totalQuestions: number;
};

export const Question: React.FC<QuestionComponent> = ({ question, onInputChange, id, totalQuestions }) => {
    return (
        <>
            <div className="font-bold pb-1">Question: {id}/{totalQuestions}</div>
            <div className="italic pb-1 font-semibold">{question.question}</div>
            {/* <ol>{question.answers.map((option: string) => <li key={option} className="hover:text-blue-500"> <label className="cursor-pointer"><input type="radio" name="option" value={option} onChange={onInputChange} checked={selected === option} /> {option} </label></li>)}</ol> */}
            <ol>{Object.keys(question.answers).map((keyName, i) => (
                // <li className="travelcompany-input" key={i}>
                //     <span className="input-label">key: {i} Name: {subjects[keyName]}</span>
                // </li>
                question.answers[keyName] !== null &&
                <label key={question.answers[keyName]} className="block cursor-pointer hover:text-blue-500"><input type="radio" name="option" value={question.answers[keyName]} onChange={onInputChange} className="cursor-pointer" /> {question.answers[keyName]} </label>
            ))}
            </ol>
        </>
    );
}