import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'LL-statistik',
  templateUrl: './statistik.component.html',
  styleUrls: ['./statistik.component.css'],
})
export class StatistikComponent {
  formattedMessage: string;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { message: string },
    public dialogRef: MatDialogRef<StatistikComponent>
  ) {
    this.formattedMessage = data.message.replace(/\n/g, '<br>');
  }
  openStatisticPopup(): void {
    window.location.href = '/home';
  }
}
