import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-skeleton-recipe-card',
  templateUrl: './skeleton-recipe-card.component.html',
  styleUrls: ['./skeleton-recipe-card.component.scss'],
})
export class SkeletonRecipeCardComponent  implements OnInit {
  @Input() isLoading = false;

  constructor() { }

  ngOnInit() {}

}
