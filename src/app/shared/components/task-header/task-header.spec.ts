import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskHeader } from './task-header';

describe('TaskHeader', () => {
  let component: TaskHeader;
  let fixture: ComponentFixture<TaskHeader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskHeader],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskHeader);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
