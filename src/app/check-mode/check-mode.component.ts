import { Component, OnInit } from '@angular/core';
import { TrueOrFalesService } from '../services/true-or-false.service';
import { QuestionNavigationService } from '../services/question-navigation.service';
import { ActivatedRoute } from '@angular/router';
import { QuestionToggleService } from '../services/question-toggle.service';
import { StatistikService } from '../services/statistik.service';
import { FrageOption } from '../Model/frage-option';


@Component({
  selector: 'LL-check-mode',
  templateUrl: './check-mode.component.html',
  styleUrls: ['./check-mode.component.css'],
})
export class CheckModeComponent implements OnInit{

  constructor(
    private trueFalse: TrueOrFalesService,
    private questNav: QuestionNavigationService,
    private questService: QuestionToggleService,
    private route: ActivatedRoute,
    private statServ: StatistikService,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const katalog = params['katalog'];
      if (katalog === 'LPI101') {
        this.trueFalse.loadKatalogAndQuestions().subscribe(() => {
        });
      } else if (katalog === 'LPI102') {
        this.trueFalse.loadKatalog2AndQuestions().subscribe(() => {
        });
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
  getQuestionServ(): QuestionToggleService{
    return this.questService;
  }
  toggleChoiceSelectionSingle(choice: FrageOption): void{
    this.questService.toggleChoiceSelectionSingle(choice);
  }
  toggleChoiceSelectionMulti(choice: FrageOption): void{
    this.questService.toggleChoiceSelectionMulti(choice);
  }
  toggleInputAnswer(answer: string | undefined): void{
    this.questService.toggleInputAnswer(answer);
  }


}
