import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotFoundComponent } from './not-found';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { provideRouter } from '@angular/router';
import { routes } from '@app/app.routes';

describe('NotFoundTs', () => {
  let component: NotFoundComponent;
  let fixture: ComponentFixture<NotFoundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotFoundComponent, TranslateModule.forRoot()],
      providers: [TranslateService, provideRouter(routes)],
    }).compileComponents();

    fixture = TestBed.createComponent(NotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
