import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  output,
} from '@angular/core';
import { CommonModule } from '@angular/common';

import { TranslateModule } from '@ngx-translate/core';
import { Owner } from '../../../shared/components/owner/owner';
import { OwnerData } from '@app/shared/interfaces/owner-interface';
import { OwnersService } from './owners-service/owners-service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-main',
  imports: [
    TranslateModule,
    Owner,
    CommonModule,
    MatCardModule,
    MatButtonModule,
  ],
  templateUrl: './main.html',
  styleUrl: './main.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Main implements OnInit {
  owners: OwnerData[] = [];

  ownersService = inject(OwnersService);

  ngOnInit(): void {
    this.ownersService.getOwners().subscribe((owners) => {
      this.owners = owners;
    });
  }

  goToRegisterPage(): void {
    console.log('Click button Get started');
  }
}
