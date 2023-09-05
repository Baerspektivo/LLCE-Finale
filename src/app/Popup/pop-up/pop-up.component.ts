import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'LL-pop-up',
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.css'],
})
export class PopUpComponent {
  formattedMessage: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { message: string },
    public dialogRef: MatDialogRef<PopUpComponent>
  ) {
    this.formattedMessage = data.message.replace(/\n/g, '<br>');
  }
  closePopUp(): void {
    this.dialogRef.close();
  }
}
