import { TestBed } from '@angular/core/testing';

import { QouteService } from './qoute.service';

describe('QouteService', () => {
  let service: QouteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QouteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
