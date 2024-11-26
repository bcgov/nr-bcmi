import { TestBed } from '@angular/core/testing';
import { AppModule } from './app.module';

jest.mock('environments/environment', () => ({
    environment: {
      production: false,
      graphURI: 'http://localhost:1337',
    },
  }));

describe('AppModule', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
    }).compileComponents();
  });

  it('should create the app module', () => {
    expect(AppModule).toBeTruthy();
  });
});
