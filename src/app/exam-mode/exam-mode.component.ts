import { Component, OnInit } from '@angular/core';
import { TrueOrFalesService } from '../services/true-or-false.service';
import { QuestionNavigationService } from '../services/question-navigation.service';
import { FrageOption } from '../Model/frage-option';
import { ActivatedRoute } from '@angular/router';
import { QuestionToggleService } from '../services/question-toggle.service';
import { StatistikService } from '../services/statistik.service';
import { Question } from '../Model/question';

@Component({
  selector: 'LL-exam-mode',
  templateUrl: './exam-mode.component.html',
  styleUrls: ['./exam-mode.component.css'],
})
export class ExamModeComponent implements OnInit {

  examModeEnabled: boolean = false;

  constructor(
    private trueFalse: TrueOrFalesService,
    private questNav: QuestionNavigationService,
    private toggle: QuestionToggleService,
    private route: ActivatedRoute,
    private statServ: StatistikService,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const katalog = params['katalog'];
      if (katalog === 'LPI101') {
        this.trueFalse.loadKatalogAndQuestions().subscribe(() => {});
      } else if (katalog === 'LPI102') {
        this.trueFalse.loadKatalog2AndQuestions().subscribe(() => {});
      }
    });
    this.statServ.resetStatistics();
  }

  getQuestionNav(): QuestionNavigationService {
    return this.questNav;
  }
  getTrueFalse(): TrueOrFalesService {
    return this.trueFalse;
  }
  getToggle(): QuestionToggleService {
    return this.toggle;
  }
  toggleChoiceSelectionSingle(choice: FrageOption): void {
    this.toggle.toggleChoiceSelectionSingle(choice);
  }
  toggleChoiceSelectionMulti(choice: FrageOption): void {
    this.toggle.toggleChoiceSelectionMulti(choice);
  }
  toggleInputAnswer(answer: string | undefined): void {
    this.toggle.toggleInputAnswer(answer);
  }

  toggleExamMode(): void {
    this.examModeEnabled = !this.examModeEnabled;
    if (this.examModeEnabled) {
      this.applyExamModeToCurrentKatalog();
    }
  }

  applyExamModeToCurrentKatalog(): void {
    const katalog = this.route.snapshot.params['katalog']; // Holt sich den aktuellen Katalog aus den Route-Parametern.

    if (katalog === 'LPI101') {
      this.applyExamModeToKatalog1();
    } else if (katalog === 'LPI102') {
      this.applyExamModeToKatalog2();
    }
  }

  applyExamModeToKatalog1(): void {
    const questionsArray = this.trueFalse.getKatalog1()
    this.processQuestions(questionsArray)
  }

  applyExamModeToKatalog2(): void {
    const questionsArray = this.trueFalse.getKatalog2()
      this.processQuestions(questionsArray)
  }

  processQuestions(questionsArray: Question[]): void {
    for (let i = 0; i < questionsArray.length; i++) {
      const currentQuestion = questionsArray[i];
      if (currentQuestion.questionType === 'single' || currentQuestion.questionType === 'multiple') {
        // Mischen der Antwortmöglichkeiten
        currentQuestion.choices = this.shuffleArray(currentQuestion.choices);
      }
    }
  }

  shuffleArray(array: any[]): any[] {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  }

}
