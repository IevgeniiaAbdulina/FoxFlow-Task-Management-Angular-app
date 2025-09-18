import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsListLarge } from './projects-list-large';

describe('ProjectsListLarge', () => {
  let component: ProjectsListLarge;
  let fixture: ComponentFixture<ProjectsListLarge>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectsListLarge],
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectsListLarge);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
