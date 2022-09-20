import { Injectable, Type } from '@angular/core';
import { FactoryService } from '../factory/factory.service';
import { IDCSharedComponentMap } from './shared.interface';

@Injectable({
  providedIn: 'root',
})
export class DCSharedService {
  // shared angular components by name
  public SharedComponents: IDCSharedComponentMap = {};

  constructor(factory: FactoryService) {
    this.SharedComponents = factory.SharedComponents;
  }

  /**
   * Get a component from shared components by its name
   * @param name DC Shared component name
   */
  public GetSharedComponent(name: string): Type<any> | undefined {
    return this.SharedComponents[name];
  }

  /**
   * Add/Set a component to shared components by name
   * @param name DC shared component name
   * @param component Angular component class
   */
  public SetSharedComponent(name: string, component: Type<any>) {
    this.SharedComponents[name] = component;
  }

  /**
   * Remove/Unset a component in shared components by its name
   * @param name DC Shared component name
   * @returns Remove component was successful or not
   */
  public RemoveSharedComponent(name: string): boolean {
    // check component exists
    if (this.SharedComponents[name]) {
      delete this.SharedComponents[name];
      return true;
    }
    // component name not found
    return false;
  }
}
