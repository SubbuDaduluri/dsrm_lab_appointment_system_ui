import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  defaultPrimaryColor = '#4287f5';
  defaultAccentColor = '#faa7f7';
  private _darkTheme = new Subject<boolean>();
  isDarkTheme = this._darkTheme.asObservable();

  constructor() { }

  setDarkTheme(isDarkTheme: boolean): void {
    this._darkTheme.next(isDarkTheme);
    if (isDarkTheme) {
      document.body.classList.add('my-dark-theme');
    } else {
      document.body.classList.remove('my-dark-theme');
    }
  }

  
}
