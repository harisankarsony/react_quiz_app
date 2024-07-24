import { SUCCESS_EMOTE, FAIL_EMOTE } from "../constants";

type Results = {
    result: number;
    totalQuestions: number;
};

export const Results: React.FC<Results> = ({ result, totalQuestions }) => {

    function getEmote() {
        let emote: string;

        if (result < totalQuestions / 2)
            emote = SUCCESS_EMOTE;
        else
            emote = FAIL_EMOTE;

        return emote;
    }

    return (
        <h1 className="text-blue-700 font-semibold">Your Score is {result}/{totalQuestions} {getEmote()}</h1>
    )
}