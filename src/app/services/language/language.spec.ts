import { TestBed } from '@angular/core/testing';
import { LanguageService } from './language';
import { TranslateService } from '@ngx-translate/core';
import { fakeAsync, tick } from '@angular/core/testing';
import { of, throwError } from 'rxjs';

describe('LanguageService', () => {
  let service: LanguageService;
  let translateServiceMock: jasmine.SpyObj<TranslateService>;
  let localStorageMock: { [key: string]: string } = {};

  beforeEach(() => {
    spyOn(localStorage, 'getItem').and.callFake(
      (key: string) => localStorageMock[key] || null
    );
    spyOn(localStorage, 'setItem').and.callFake(
      (key: string, value: string) => {
        localStorageMock[key] = value;
      }
    );

    translateServiceMock = jasmine.createSpyObj('TranslateService', [
      'addLangs',
      'setDefaultLang',
      'use',
      'getBrowserLang',
    ]);

    translateServiceMock.addLangs.and.returnValue(undefined);
    translateServiceMock.setDefaultLang.and.returnValue(undefined);
    translateServiceMock.use.and.callFake((lang: string) => {
      if (lang === 'fr')
        return throwError(() => new Error('Unsupported language'));
      return of(undefined);
    });
    translateServiceMock.getBrowserLang.and.returnValue('en');

    TestBed.configureTestingModule({
      providers: [
        LanguageService,
        { provide: TranslateService, useValue: translateServiceMock },
      ],
    });

    service = TestBed.inject(LanguageService);
  });

  afterEach(() => {
    localStorageMock = {};
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should switch to supported language', fakeAsync(() => {
    service.switchLanguage('pl');
    let lang = '';
    service.currentLang$.subscribe((value) => (lang = value));
    tick();
    if (!lang) throw new Error('Language not assigned');
    expect(lang).toBe('pl');
    expect(translateServiceMock.use).toHaveBeenCalledWith('pl');
    expect(localStorageMock['lang']).toBe('pl');
  }));

  it('should not switch to unsupported language', fakeAsync(() => {
    let initialLang = '';
    service.currentLang$.subscribe((value) => (initialLang = value));
    tick();
    if (!initialLang) throw new Error('Initial language not assigned');
    service.switchLanguage('fr');
    let finalLang = '';
    service.currentLang$.subscribe((value) => (finalLang = value));
    tick();
    if (!finalLang) throw new Error('Final language not assigned');
    expect(finalLang).toBe(initialLang);
    expect(translateServiceMock.use).toHaveBeenCalledWith('fr');
    expect(localStorageMock['lang']).toBe(initialLang);
  }));
});
