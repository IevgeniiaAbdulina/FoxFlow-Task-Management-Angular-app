import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialButtonGoogle } from './social-button-google';

describe('SocialButtonGoogle', () => {
  let component: SocialButtonGoogle;
  let fixture: ComponentFixture<SocialButtonGoogle>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SocialButtonGoogle],
    }).compileComponents();

    fixture = TestBed.createComponent(SocialButtonGoogle);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
