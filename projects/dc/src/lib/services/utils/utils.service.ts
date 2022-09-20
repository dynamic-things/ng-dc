import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  constructor() {}

  public ObjectToMap<K = string, V = any>(
    object: Object | undefined
  ): Map<K, V> {
    let map = new Map<K, V>();

    if (object != undefined) {
      try {
        map = new Map<K, V>(Object.entries(object) as any);
      } catch (error) {
        console.error(
          '[DC Lite] could not convert object to map in UtilsService'
        );
      }
    }

    return map;
  }
}
