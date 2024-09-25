import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, shareReplay } from 'rxjs';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {
  constructor() {}

  ngOnInit() {
    console.log('tab/4');
  }
}
