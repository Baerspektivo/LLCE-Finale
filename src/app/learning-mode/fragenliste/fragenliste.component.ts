import { Component, OnInit } from '@angular/core';

import { TrueOrFalesService } from 'src/app/services/true-or-false.service';
import { QuestionNavigationService } from 'src/app/services/question-navigation.service';
import { Question } from 'src/app/Model/question';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionToggleService } from 'src/app/services/question-toggle.service';


@Component({
  selector: 'LL-fragenliste',
  templateUrl: './fragenliste.component.html',
  styleUrls: ['./fragenliste.component.css'],
})
export class FragenlisteComponent implements OnInit {
  constructor(
    private trueFalse: TrueOrFalesService,
    private questService: QuestionToggleService,
    private questNav: QuestionNavigationService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  selectedQuestionIndex: number = -1;
  showAnswerIndex: number | null = null;

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

  showAnswer(index: number):void{
    this.showAnswerIndex = index;
  }
  getTrueFlase(): TrueOrFalesService {
    return this.trueFalse;
  }
  getQuestNav(): QuestionNavigationService {
    return this.questNav;
  }
  getKatalog(): Question[] {
    return this.trueFalse.getKatalog1();
  }
  getQuestService(): QuestionToggleService{
    return this.questService;
  }
  selectedQuestion(index:number):void{
    this.selectedQuestionIndex = index;
  }
  navigateToFilterPage(): void {
    this.router.navigate(['/filter']); // Hier den Pfad zur Filterseite einfügen
  }
  navigateToRoot():void{
    this.router.navigate(['/'])
  }

}
