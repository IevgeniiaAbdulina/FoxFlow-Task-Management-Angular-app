import { Component, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-social-button-github',
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './social-button-github.html',
  styleUrl: './social-button-github.scss',
})
export class SocialButtonGithub {
  readonly loginWithGitHub = output();
}
