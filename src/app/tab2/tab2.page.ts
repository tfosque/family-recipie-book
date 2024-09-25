import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PageService } from '../services/page.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page {
  constructor(
    private readonly router: Router,
    private readonly pageSvc: PageService,
  ) {}

  ngOnInit(): void {
    const currUrl = this.router.url;
    this.pageSvc.setActivePage(currUrl);
  }
}
