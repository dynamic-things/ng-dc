/**
 * This file use for default and forRoot passed value
 */
import { Injectable } from '@angular/core';
import { IDCSharedComponentMap } from '../shared/shared.interface';

@Injectable({
  providedIn: 'root',
})
export class FactoryService {
  public SharedComponents: IDCSharedComponentMap = {};

  constructor() {}
}
