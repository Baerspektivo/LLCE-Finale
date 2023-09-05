import { Question } from "./question";

export interface AnswerData {
  question: Question;
  userAnswer: string;
  isCorrect: boolean;
}
