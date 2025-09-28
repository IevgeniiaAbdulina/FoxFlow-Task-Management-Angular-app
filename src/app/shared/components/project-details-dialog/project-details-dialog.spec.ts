import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectDetailsDialog } from './project-details-dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

describe('ProjectDetailsDialog', () => {
  let component: ProjectDetailsDialog;
  let fixture: ComponentFixture<ProjectDetailsDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectDetailsDialog],
      providers: [
        {
          provide: MatDialogRef,
          useValue: { close: jasmine.createSpy('close') },
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: { name: 'Test Project' },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectDetailsDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
