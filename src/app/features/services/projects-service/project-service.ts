import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { Project } from '@app/shared/interfaces/project-interface';
import { ProjectsFirebaseService } from '@app/features/services/projects-service/projects-firebase-service';
import { NotificationService } from '@app/shared/services/notification-service';
import { MemberInterface } from '@app/shared/interfaces/member-interface';
import { UsersService } from '@app/auth/services/users-service';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private projectsFirebaseService = inject(ProjectsFirebaseService);
  private notificationService = inject(NotificationService);
  private usersService = inject(UsersService);

  readonly currentProject: WritableSignal<Project | null> =
    signal<Project | null>(null);
  readonly currentProjectOwner: WritableSignal<MemberInterface | null> =
    signal<MemberInterface | null>(null);

  getProject(projectId: string): void {
    this.projectsFirebaseService
      .getProject(projectId)
      .subscribe((result: Project) => {
        this.usersService.findProjectOwner(result.owner).subscribe((user) => {
          this.currentProjectOwner.set(user);
        });

        this.currentProject.set(result);
      });
  }

  removeProject(projectId: string): void {
    this.projectsFirebaseService.removeProject(projectId).subscribe(() => {
      this.notificationService.showSuccessMessage(
        'Project deleted successfully.'
      );
    });
  }

  updateProject(editingId: string, editingText: string): void {
    const dataToUpdate = {
      title: editingText,
    };

    this.projectsFirebaseService
      .updateProject(editingId, dataToUpdate)
      .subscribe(() => {
        this.getProject(editingId);
      });
  }
}
