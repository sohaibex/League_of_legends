import { TestBed } from '@angular/core/testing';

import { ChampionService } from './champion.service';

describe('ChampionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ChampionService = TestBed.get(ChampionService);
    expect(service).toBeTruthy();
  });
});
