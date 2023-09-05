import { Component, OnInit } from '@angular/core';

import { TrueOrFalesService } from 'src/app/services/true-or-false.service';
import { QuestionNavigationService } from 'src/app/services/question-navigation.service';
import { Question } from 'src/app/Model/question';
import { ActivatedRoute } from '@angular/router';
import { QuestionToggleService } from 'src/app/services/question-toggle.service';



@Component({
  selector: 'LL-einzelfragen',
  templateUrl: './einzelfragen.component.html',
  styleUrls: ['./einzelfragen.component.css'],
})
export class EinzelfragenComponent implements OnInit {
  filteredQuestions: Question[] = [];
  showAnswer: boolean = false;

  constructor(
    private trueFalse: TrueOrFalesService,
    private questNav: QuestionNavigationService,
    private questService: QuestionToggleService,
    private route: ActivatedRoute,
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
  }

  getQuestionNav(): QuestionNavigationService {
    return this.questNav;
  }
  getTrueFalse(): TrueOrFalesService {
    return this.trueFalse;
  }
  getQuestService(): QuestionToggleService{
    return this.questService;
  }
}
