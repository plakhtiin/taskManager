import { TestBed, inject } from '@angular/core/testing';

import { TestJsonService } from './test-json.service';

describe('TestJsonService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TestJsonService]
    });
  });

  it('should be created', inject([TestJsonService], (service: TestJsonService) => {
    expect(service).toBeTruthy();
  }));
});
