import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialButtonGithub } from './social-button-github';

describe('SocialButtonGithub', () => {
  let component: SocialButtonGithub;
  let fixture: ComponentFixture<SocialButtonGithub>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SocialButtonGithub],
    }).compileComponents();

    fixture = TestBed.createComponent(SocialButtonGithub);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
