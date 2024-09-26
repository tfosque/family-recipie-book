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
    this.foodSvc.food$.pipe().subscribe((food: any) => {
      this.food$.next(food);
      this.nextUrl = food[0].nextPage.next;
      console.log({ food });
    });
  }

  nextPage() {
    const next = this.nextUrl;
    this.foodSvc.nextPage(next);
  }
}
