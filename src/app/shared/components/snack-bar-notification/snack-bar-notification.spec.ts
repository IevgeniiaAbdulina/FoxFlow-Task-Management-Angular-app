import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SnackBarNotification } from './snack-bar-notification';

describe('SnackBarNotification', () => {
  let component: SnackBarNotification;
  let fixture: ComponentFixture<SnackBarNotification>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SnackBarNotification],
    }).compileComponents();

    fixture = TestBed.createComponent(SnackBarNotification);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
