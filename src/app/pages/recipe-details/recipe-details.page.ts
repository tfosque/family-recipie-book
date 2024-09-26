import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { RecipeService } from 'src/app/services/recipe.service';
import * as _ from 'lodash';

interface FoodItem {
  title: string;
  desc: string;
  isRecipeFavorite: boolean;
  imgSet?: ImgSet;
  average_price: string;
  uom: string;
  imgUrl: string;
  ingredients: any[];
  labels: string[];
}

interface ImgSet {
  default: string;
  thumb: string;
  large: string;
  dummyImg: string;
}

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.page.html',
  styleUrls: ['./recipe-details.page.scss'],
})
export class RecipeDetailsPage implements OnInit {
  selectedRecipe = new BehaviorSubject<any>({});
  //
  title = '';
  desc = '';
  isRecipeFavorite = false;
  imgSet: ImgSet = {
    default: '',
    thumb: '',
    large: '',
    dummyImg: 'https://placehold.co/360x360',
  };
  average_price = '';
  uom = '';
  imgUrl = '';
  ingredients: any[] = [];
  labels: string[] = [];
  //
  presentingElement: any = null;

  constructor(private readonly recipeSvc: RecipeService) {}

  ngOnInit() {
    // TODO on page refresh fetch item again
    // this.recipeSvc.getRecipesMongoDB();
    this.recipeSvc.selectedRecipe$.subscribe((item: FoodItem) => {
      //
      this.selectedRecipe.next(item);
      console.log('this.selected', this.selectedRecipe.value);
      console.log({ item });
      //
      if (!_.isEmpty(item)) {
        this.title = item.title;
        this.desc = item.desc;
        this.isRecipeFavorite = item.isRecipeFavorite;
        // this.imgSet = item.imgSet;
        this.average_price = item.average_price;
        this.uom = item.uom;
        // this.imgUrl = item.imgUrl;
        this.ingredients = item.ingredients;
        this.labels = item.ingredients;
        // console.log('ingredients:::', this.ingredients);
        // console.log('labels:::', this.labels);
        return;
      } // TODO handle UI
      console.log('no data on page refresh');
    });
  }

  handleImgError(event: any) {
    console.log('Image failed to load:', event);
    event.target.src = '/assets/images/fallback.png';
  }
}
