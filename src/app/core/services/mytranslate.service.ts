import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MytranslateService {
  constructor() {
    this.changeLang();
  }
  changeLang(): void {
    if (localStorage.getItem('lang') === 'en') {
      document.documentElement.setAttribute('dir', 'ltr');
      document.documentElement.setAttribute('lang', 'en');
    } else if (localStorage.getItem('lang') === 'ar') {
      document.documentElement.setAttribute('dir', 'rtl');
      document.documentElement.setAttribute('lang', 'ar');
    }
  }
}
