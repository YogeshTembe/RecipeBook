import { TestBed } from '@angular/core/testing';

import { ResolveRecipesService } from './resolve-recipes.service';

describe('ResolveRecipesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ResolveRecipesService = TestBed.get(ResolveRecipesService);
    expect(service).toBeTruthy();
  });
});
