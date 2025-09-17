import { Component, output, ChangeDetectionStrategy } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-social-button-google',
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './social-button-google.html',
  styleUrl: './social-button-google.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SocialButtonGoogle {
  readonly loginWithGoogle = output();
}
