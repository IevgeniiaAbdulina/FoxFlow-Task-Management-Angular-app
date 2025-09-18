import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectDetailsDialog } from './project-details-dialog';

describe('ProjectDetailsDialog', () => {
  let component: ProjectDetailsDialog;
  let fixture: ComponentFixture<ProjectDetailsDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectDetailsDialog],
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectDetailsDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
