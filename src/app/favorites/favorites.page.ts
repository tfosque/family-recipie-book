import { Component, OnInit } from '@angular/core';
import { FoodService } from '../services/food.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
})
export class FavoritesPage implements OnInit {
  food$ = new BehaviorSubject<any>([]);
  nextUrl = '';

  constructor(private readonly foodSvc: FoodService) {}

  ngOnInit() {
    this.foodSvc.getFoodEdamam();
    //
    this.foodSvc.food_eda$.pipe().subscribe((eda: any) => {
      this.food$.next(eda);
      this.nextUrl = eda[0].nextPage.next;
      console.log({ eda });
    });
  }

  nextPage() {
    const next = this.nextUrl;
    this.foodSvc.nextPage(next);
  }
}
