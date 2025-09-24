import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { Project } from '@app/shared/interfaces/project-interface';
import { ProjectsFirebaseService } from '@app/features/services/projects-service/projects-firebase-service';
import { AuthService } from '@app/auth/services/auth-service';
import { NotificationService } from '@app/shared/services/notification-service';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private projectsFirebaseService = inject(ProjectsFirebaseService);
  private authService = inject(AuthService);
  private notificationService = inject(NotificationService);

  readonly currentProject: WritableSignal<Project | null> =
    signal<Project | null>(null);

  getProject(projectId: string): void {
    this.projectsFirebaseService
      .getProject(projectId)
      .subscribe((result: Project) => {
        this.currentProject.set(result);
      });
  }

  removeProject(projectId: string, projectOwner: string): void {
    const user = this.authService.currentUser()?.uid;

    if (user === projectOwner) {
      this.projectsFirebaseService.removeProject(projectId).subscribe(() => {
        this.notificationService.showSuccessMessage(
          'Project deleted successfully.'
        );
      });
    } else {
      const message = 'Project can be removed only by owner.';
      this.notificationService.showErrorMessage(message);
      return;
    }
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
