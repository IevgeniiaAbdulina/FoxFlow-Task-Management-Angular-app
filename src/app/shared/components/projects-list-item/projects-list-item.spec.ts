import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsListItem } from './projects-list-item';

describe('ProjectsListItem', () => {
  let component: ProjectsListItem;
  let fixture: ComponentFixture<ProjectsListItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectsListItem],
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectsListItem);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
