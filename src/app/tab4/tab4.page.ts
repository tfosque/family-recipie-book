import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, shareReplay } from 'rxjs';
import { SpoonacularService } from '../services/spoonacular.service';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {
  food$ = new BehaviorSubject<any>([]);

  constructor(private readonly spoonacularSvc: SpoonacularService) {}

  ngOnInit() {
    console.log('tab/4');
    this.spoonacularSvc.getFoodSpoonacular();
    //
    this.spoonacularSvc.food$.subscribe((f: any) => {
      console.log({ f });
      this.food$.next(f);
    });
  }
}
