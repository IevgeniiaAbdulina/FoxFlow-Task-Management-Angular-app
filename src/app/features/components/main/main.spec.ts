import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Main } from './main';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { FirebaseServiceTs } from '@app/services/firebase/firebase-service';
import { OwnersService } from '@app/features/services/owners-service/owners-service';
import { provideRouter } from '@angular/router';
import { routes } from '@app/app.routes';
import { of } from 'rxjs';

describe('Main', () => {
  let component: Main;
  let fixture: ComponentFixture<Main>;

  let mockFirebaseService: jasmine.SpyObj<FirebaseServiceTs>;
  let mockOwnerService: jasmine.SpyObj<OwnersService>;

  beforeEach(async () => {
    mockFirebaseService = jasmine.createSpyObj('FirebaseServiceTs', ['']);
    mockOwnerService = jasmine.createSpyObj('OwnersService', ['getOwners']);

    mockOwnerService.getOwners.and.returnValue(of([]));

    await TestBed.configureTestingModule({
      imports: [Main, TranslateModule.forRoot()],
      providers: [
        TranslateService,
        provideRouter(routes),
        { provide: FirebaseServiceTs, useValue: mockFirebaseService },
        { provide: OwnersService, useValue: mockOwnerService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Main);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
