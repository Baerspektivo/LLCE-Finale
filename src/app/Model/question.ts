import { FrageOption } from "./frage-option";

export interface Question {
  questionNumber: string;
  questionText: string;
  choices: FrageOption[];
  answer: string | string[];
  questionType: 'single' | 'multiple' | 'input';
}
