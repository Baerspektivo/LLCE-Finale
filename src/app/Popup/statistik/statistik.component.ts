import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'LL-statistik',
  templateUrl: './statistik.component.html',
  styleUrls: ['./statistik.component.css'],
})
export class StatistikComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { message: string },
    public dialogRef: MatDialogRef<StatistikComponent>
  ) {}

  openStatisticPopup(): void {
    window.location.href = '/home';
  }
}
