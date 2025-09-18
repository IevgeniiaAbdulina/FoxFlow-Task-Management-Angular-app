import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskBody } from './task-body';

describe('TaskBody', () => {
  let component: TaskBody;
  let fixture: ComponentFixture<TaskBody>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskBody],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskBody);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
