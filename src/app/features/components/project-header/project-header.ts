import {
  Component,
  inject,
  signal,
  ChangeDetectionStrategy,
  computed,
  OnInit,
  DestroyRef,
} from '@angular/core';
import { ProjectService } from '@app/features/services/projects-service/project-service';
import { A11yModule } from '@angular/cdk/a11y';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationDialog } from '@app/shared/components/confirmation-dialog/confirmation-dialog';
import { MatDialog } from '@angular/material/dialog';
import { MatCardSmImage } from '@angular/material/card';
import { NgOptimizedImage } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-project-header',
  imports: [
    A11yModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatCardSmImage,
    NgOptimizedImage,
    MatMenuModule,
  ],
  templateUrl: './project-header.html',
  styleUrl: './project-header.scss',
  providers: [],
  host: {
    '[attr.data-actions-expand]': '!isEditing()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectHeader implements OnInit {
  private destroyRef = inject(DestroyRef);
  private breakpointObserver = inject(BreakpointObserver);
  private projectService = inject(ProjectService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private dialog = inject(MatDialog);

  readonly project$ = computed(() => this.projectService.currentProject());
  readonly isEditing = signal<boolean>(false);
  readonly isShowActions = signal<boolean>(true);
  readonly editingText = signal('');

  projectId = '';

  ngOnInit(): void {
    this.route.params
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((params) => {
        this.projectId = params['id'];

        this.projectService.getProject(this.projectId);
      });

    this.setResponsiveHeader();
  }

  private setResponsiveHeader(): void {
    this.breakpointObserver
      .observe(['(max-width: 800px)'])
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((screenSize) => {
        if (screenSize.matches) {
          this.isShowActions.set(false);
        } else {
          this.isShowActions.set(true);
        }
      });
  }

  startEditing(): void {
    this.editingText.set(this.project$()?.title ?? '');
    this.isEditing.set(true);
  }

  saveEditing(): void {
    if (this.editingText()) {
      this.projectService.updateProject(this.projectId, this.editingText());
    }

    this.isEditing.set(false);
  }

  cancelEditing(): void {
    this.isEditing.set(false);
    this.editingText.set('');
  }

  confirmDelete(): void {
    const dialogRef = this.dialog.open(ConfirmationDialog, {
      data: {
        title: 'Delete Project',
        message:
          'Are you sure you want to delete this project? This action cannot be undone.',
        confirmText: 'Delete',
        cancelText: 'Cancel',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.removeProject();
      }
    });
  }

  removeProject(): void {
    this.isEditing.set(false);
    this.editingText.set('');

    const projectOwner = this.project$()?.owner as string;

    if (this.project$()) {
      this.projectService.removeProject(this.projectId, projectOwner);
    } else {
      console.log('No such project!');
    }

    this.router.navigate(['/home']);
  }
}
