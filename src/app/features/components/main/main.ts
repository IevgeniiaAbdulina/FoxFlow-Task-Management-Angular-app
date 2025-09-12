import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';

import { TranslateModule } from '@ngx-translate/core';
import { Member } from '../../../shared/components/member/member';
import { MemberData } from '@app/shared/interfaces/member-interface';
import { MembersService } from './members-service/members-service';

@Component({
  selector: 'app-main',
  imports: [TranslateModule, Member, CommonModule],
  templateUrl: './main.html',
  styleUrl: './main.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Main implements OnInit {
  members: MemberData[] = [];

  membersService = inject(MembersService);

  ngOnInit(): void {
    this.membersService.getMembers().subscribe((members) => {
      this.members = members;
    });
  }
}
