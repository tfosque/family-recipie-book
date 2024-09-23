import { Component } from '@angular/core';
import { RecipeService } from '../services/recipe.service';
import { BehaviorSubject } from 'rxjs';
// import { InfiniteScrollCustomEvent } from '@ionic/angular';
import * as _ from 'lodash';

@Component( {
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
} )
export class Tab1Page {
  letters: any[] = [];
  recipes$ = new BehaviorSubject<any>( [] );
  emptyRecipes = false;
  isLoading = true;

  constructor(
    private readonly recipeSvc: RecipeService
  ) {

  }

  ngOnInit(): void {
    // this.recipeSvc.getRecipes();
    this.recipeSvc.getRecipesMongoDB();
    //
    this.recipeSvc.recipes$.subscribe( ( r: any ) => {

      // build letters of alphabet
      // check if recipes exist
      if ( r?.length ) {
        this.recipes$.next( r );
        this.isLastRowItem();
        this.isLoading = false; // TODO move to service and catch error

        // build list
        const results = this.recipes$.value.map( ( rp: any ) => {
          // list all first chars
          return rp.title[0]
        } )
        // concat to uniq list with no duplicates
        const uniqueArray = _.uniq( results );
        this.letters = uniqueArray;
        return;
      }
      // if empty alert user no recipes exist
      this.emptyRecipes = true;
    } )
  }

  isLastRowItem() {
    // map over recipes and identify the last item of each leter 
  
    const arr = this.recipes$.value;    
      for ( let i = 0; i < arr.length - 1; i++ ) {
        const currentItem = arr[i].title[0];
        const nextItem = arr[i + 1].title[0];

        if ( currentItem === nextItem ) {
          // console.log( `Match found: ${currentItem} matches ${nextItem}` );
          arr[i].showLines = true
        } else {
          // lines = 'none' here
          arr[i].showLines = false
          // console.log( `No match: ${currentItem} does not match ${nextItem}` );
        }      
    }
  }
}
