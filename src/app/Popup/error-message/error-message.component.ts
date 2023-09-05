import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'LL-error-message',
  templateUrl: './error-message.component.html',
  styleUrls: ['./error-message.component.css'],
})
export class ErrorMessageComponent {
  formattedMessage: string;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { message: string },
    public dialogRef: MatDialogRef<ErrorMessageComponent>
  ) {
    this.formattedMessage = data.message.replace(/\n/g, '<br>');
  }
  errorPopup(): void {
    window.location.href = '/home';
  }
}
