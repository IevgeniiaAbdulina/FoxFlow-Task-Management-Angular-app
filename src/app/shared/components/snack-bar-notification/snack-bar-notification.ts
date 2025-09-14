import { Component, inject } from '@angular/core';
import {
  MAT_SNACK_BAR_DATA,
  MatSnackBarAction,
  MatSnackBarActions,
  MatSnackBarLabel,
  MatSnackBarRef,
} from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { NgClass } from '@angular/common';

interface SnackBarData {
  message: string;
  className: string;
}

@Component({
  selector: 'app-snack-bar-notification',
  imports: [
    MatButtonModule,
    MatSnackBarLabel,
    MatSnackBarActions,
    MatSnackBarAction,
    NgClass,
  ],
  templateUrl: './snack-bar-notification.html',
  styleUrl: './snack-bar-notification.scss',
})
export class SnackBarNotification {
  snackBarRef = inject(MatSnackBarRef);
  data: SnackBarData = inject(MAT_SNACK_BAR_DATA);

  message = this.data.message;
  className = this.data.className;
}
