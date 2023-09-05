import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PopUpComponent } from '../Popup/pop-up/pop-up.component';
import { StatistikComponent } from '../Popup/statistik/statistik.component';
import { ErrorMessageComponent } from '../Popup/error-message/error-message.component';

@Injectable({
  providedIn: 'root',
})
export class PopupService {
  constructor(
    private dialog: MatDialog,
  ) {}

  openPopUp(message: string): void {
    this.dialog.open(PopUpComponent, {
      data: { message: message },
    });
  }

  errorPopup(message: string): void {
    this.dialog.open(ErrorMessageComponent , {
      data: { message: message },
    });
  }

  openStatisticPopup(message: string): void {
    this.dialog.open(StatistikComponent, {
      data: { message: message },
    });
  }

  dontMoveWitNowAnswer(): void {
    this.openPopUp('Please provide an answer before proceeding');
  }

  wrongAnswerMessage(): void {
    this.openPopUp( //ändern
      "There are two possibilities:\n\nA) You were not paying attention\nB) You were not honest\nIf you really don't know, skip the question."
    );
  }

  backToLearningCenterExam(): void {
    this.errorPopup(
      'You have already answered more than 20% of the questions incorrectly. The exam will be terminated.'
    );
  }

  backToLearningCenterCheck(): void {
      this.errorPopup(
        'You have already answered 7 of the questions incorrectly. The check will be terminated.'
      );
    }
}
