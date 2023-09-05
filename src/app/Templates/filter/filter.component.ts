import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Question } from 'src/app/Model/question';
import { FilterService } from 'src/app/services/filter.service';
import { QuestionNavigationService } from 'src/app/services/question-navigation.service';
import { QuestionToggleService } from 'src/app/services/question-toggle.service';
import { TrueOrFalesService } from 'src/app/services/true-or-false.service';

@Component({
  selector: 'LL-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent {
  @Input() selectedType: string = '';
  @Output() selectedTypeChange = new EventEmitter<string>();

  filteredQuestions: Question[] = [];
  selectedKatalog: string = 'LPI101';
  questionTypes: string[] = ['single', 'multiple', 'input'];

  constructor(
    private trueFalse: TrueOrFalesService,
    private filterService: FilterService,
    private questNav: QuestionNavigationService,
    private questService: QuestionToggleService,
    private route: ActivatedRoute,
  ) {

  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const katalog = params['katalog'];
      if (katalog === 'LPI101') {
        this.trueFalse.loadKatalogAndQuestions().subscribe(() => {});
      } else if (katalog === 'LPI102') {
        this.trueFalse.loadKatalog2AndQuestions().subscribe(() => {});
      }
    });
    this.filterService.selectedType$.subscribe(selectedType => {
      this.filterQuestions(selectedType);
    });
  }

  filterQuestions(selectedType: string): void {
    if (this.selectedKatalog === 'LPI101') {
      this.filteredQuestions = this.filterService.filteredQuestionsLPI101;
    } else if (this.selectedKatalog === 'LPI102') {
      this.filteredQuestions = this.filterService.filteredQuestionsLPI102;
    }
    console.log('fSfQL1',this.filterService.filteredQuestionsLPI101,'fQ',this.filteredQuestions)
  }

  selectCatalog(katalog: string): void{
    this.selectedKatalog = katalog;
    this.filterQuestions(this.selectedType);
  }

  onTypeButtonClick(type: string): void {
    this.selectedType = type;
    this.filterService.setSelectedType(type);
  }

  onTypeChange(event: any): void {
    const selectedType = event?.target?.value;
    if (selectedType !== undefined) {
      this.selectedTypeChange.emit(selectedType);
      this.filterService.setSelectedType(selectedType);
    }
  }

  onKatalogChange(selectedKatalog: string): void {
    this.selectedKatalog = selectedKatalog;
    this.filterQuestions(this.selectedType);
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
}
