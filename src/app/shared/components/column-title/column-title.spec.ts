import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColumnTitle } from './column-title';

describe('ColumnTitle', () => {
  let component: ColumnTitle;
  let fixture: ComponentFixture<ColumnTitle>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ColumnTitle],
    }).compileComponents();

    fixture = TestBed.createComponent(ColumnTitle);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
