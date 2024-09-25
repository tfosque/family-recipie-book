import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PageService {
  private activePage = new BehaviorSubject<string>('');
  public activePage$ = this.activePage.asObservable();

  constructor() {}

  setActivePage(activePageUrl: string) {
    console.log({ activePageUrl });
    this.activePage.next(activePageUrl);
  }
}
