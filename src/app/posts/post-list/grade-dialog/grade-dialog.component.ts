import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';


@Component({
  templateUrl: './grade-dialog.component.html',
  styleUrls: ['./grade-dialog.component.css']
})

export class GradeDialogComponent {
  lessons = ['Fizika', 'Anglu', 'Informatika'];

  constructor(@Inject(MAT_DIALOG_DATA) public data) {}

}
