import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LanguageSwitcherComponent } from './language-switcher';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { LanguageService } from '../../../services/language/language';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { By } from '@angular/platform-browser';

describe('LanguageSwitcherComponent', () => {
  let component: LanguageSwitcherComponent;
  let fixture: ComponentFixture<LanguageSwitcherComponent>;
  let languageService: LanguageService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        LanguageSwitcherComponent,
        MatIconModule,
        MatMenuModule,
        MatButtonModule,
        MatTooltipModule,
        TranslateModule.forRoot(),
      ],
      providers: [LanguageService, TranslateService],
    }).compileComponents();

    fixture = TestBed.createComponent(LanguageSwitcherComponent);
    component = fixture.componentInstance;
    languageService = TestBed.inject(LanguageService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should switch language using LanguageService', () => {
    spyOn(languageService, 'switchLanguage');
    const button = fixture.debugElement.query(
      By.css('button[matMenuTriggerFor]')
    );
    button.triggerEventHandler('click', null);
    fixture.detectChanges();
    const menuItems = fixture.debugElement.queryAll(
      By.css('button[mat-menu-item]')
    );
    menuItems[1].triggerEventHandler('click', { value: 'pl' });
    expect(languageService.switchLanguage).toHaveBeenCalledWith('pl');
  });

  it('should display tooltip', () => {
    const button = fixture.debugElement.query(
      By.css('button[mat-icon-button]')
    );
    expect(button.attributes['matTooltip']).toBe(
      'Choose your preferred language'
    );
    expect(button.attributes['aria-label']).toBe('Select language');
  });
});
