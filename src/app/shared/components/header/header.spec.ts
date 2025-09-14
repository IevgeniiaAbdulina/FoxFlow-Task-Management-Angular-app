import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatMenuModule } from '@angular/material/menu';
import { RouterTestingModule } from '@angular/router/testing';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Observable, of } from 'rxjs';

class MockBreakpointObserver {
  observe(): Observable<{ matches: boolean }> {
    return of({ matches: false });
  }
}

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HeaderComponent,
        TranslateModule.forRoot(),
        MatToolbarModule,
        MatButtonModule,
        MatIconModule,
        MatSelectModule,
        MatSlideToggleModule,
        MatMenuModule,
        RouterTestingModule,
      ],
      providers: [
        TranslateService,
        { provide: BreakpointObserver, useClass: MockBreakpointObserver },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle theme', () => {
    component.toggleTheme();
    expect(component.isDarkMode).toBe(true);
    expect(localStorage.getItem('theme')).toBe('dark');
  });
});
