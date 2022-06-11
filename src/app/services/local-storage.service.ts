import { Injectable } from '@angular/core';
import { Order } from '../types/interface';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  readLocalStorage(key: string) {
    const data = localStorage.getItem(key);
    if (data) {
      return JSON.parse(data);
    } else {
      return null;
    }
  }

  setLocalStorage(key: string, array: Array<Order>) {
    const string = JSON.stringify(array);
    localStorage.setItem(key, string);
  }
}
