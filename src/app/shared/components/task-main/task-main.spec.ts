import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskMain } from './task-main';

describe('TaskMain', () => {
  let component: TaskMain;
  let fixture: ComponentFixture<TaskMain>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskMain],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskMain);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
