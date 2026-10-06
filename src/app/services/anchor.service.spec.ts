import { TestBed } from '@angular/core/testing';

import { AnchorService } from './anchor.service';
import { provideRouter } from '@angular/router';

describe('AnchorService', () => {
  let service: AnchorService;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [provideRouter([])] });
    service = TestBed.inject(AnchorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
