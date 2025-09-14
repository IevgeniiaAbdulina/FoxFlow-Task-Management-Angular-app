import { inject, Injectable } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { SnackBarNotification } from '@app/shared/components/snack-bar-notification/snack-bar-notification';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private _snackBar = inject(MatSnackBar);

  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  durationInSeconds = 10;

  private openSnackBar(message: string, className: string): void {
    this._snackBar.openFromComponent(SnackBarNotification, {
      data: { message, className },
      duration: this.durationInSeconds * 1000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

  showErrorMessage(message: string): void {
    this.openSnackBar(message, 'error');
  }

  showSuccessMessage(message: string): void {
    this.openSnackBar(message, 'success');
  }
}
