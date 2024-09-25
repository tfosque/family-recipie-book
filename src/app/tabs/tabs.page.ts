import { Component, OnInit } from '@angular/core';
import { PageService } from '../services/page.service';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
})
export class TabsPage implements OnInit {
  currUrl = '';

  constructor(
    private readonly pageSvc: PageService,
    private readonly router: Router,
  ) {}

  ngOnInit(): void {
    const currUrl = this.router.url;
    this.pageSvc.setActivePage(currUrl);
    //
    this.pageSvc.activePage$.subscribe((url) => {
      this.currUrl = url;
    });
  }

  setActivePage(page: string) {
    this.pageSvc.setActivePage(page);
    console.log('setActivePage:', page);
  }
}
