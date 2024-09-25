import { Component } from '@angular/core';
import { RecipeService } from '../services/recipe.service';
import { BehaviorSubject, shareReplay } from 'rxjs';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page {
  recipes$ = new BehaviorSubject<any>([]);

  constructor(private recipeSvc: RecipeService) {}

  ngOnInit(): void {
    this.recipeSvc.getRecipesEdamam();
    //
    this.recipeSvc.recipes_eda$.pipe(shareReplay(1)).subscribe((eda: any) => {
      this.recipes$.next(eda);
      console.log({ eda });
    });
  }
}
