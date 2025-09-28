import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GreetingComponent } from './greeting-component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

describe('GreetingComponent', () => {
  let component: GreetingComponent;
  let fixture: ComponentFixture<GreetingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GreetingComponent, TranslateModule.forRoot()],
      providers: [TranslateService],
    }).compileComponents();

    fixture = TestBed.createComponent(GreetingComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('user$', { name: 'Test User', id: 1 });
    fixture.componentRef.setInput('projects$', []);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
