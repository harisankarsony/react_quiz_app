import { makeVar } from "@apollo/client";
import { BUTTON_TEXT_NEXT } from "./constants";

export const showResultVar = makeVar(false);
export const currentQuestionVar = makeVar(0);
export const selectedAnswersVar = makeVar<Array<string>>([]);
export const buttonTextVar = makeVar(BUTTON_TEXT_NEXT);
export const timeLeftVar = makeVar(10);
export const questionsVar = makeVar<Array<any>>([]);
export const loadingStatusVar = makeVar("");