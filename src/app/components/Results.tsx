import { SUCCESS_EMOTE, FAIL_EMOTE } from "../constants";
import Form from "./Form";

type Results = {
    result: number;
    totalQuestions: number;
};

export const Results: React.FC<Results> = ({ result, totalQuestions }) => {

    function getEmote() {
        let emote: string;

        if (result < (totalQuestions / 2)) {
            emote = FAIL_EMOTE;
        }
        else {
            emote = SUCCESS_EMOTE;
        }

        return emote;
    }

    return (
        <>
            <h1 className="text-blue-700 font-semibold">Your Score is {result}/{totalQuestions} {getEmote()}</h1>
            <Form />
        </>
    )
}