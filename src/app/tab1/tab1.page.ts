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
  isLoaded = false;

  constructor(
    private readonly recipeSvc: RecipeService
  ) {

  }

  ngOnInit(): void {
    this.recipeSvc.getRecipes();
    //
    this.recipeSvc.recipes$.subscribe( ( r: any ) => {

      // build letters of alphabet
      // check if recipes exist
      if ( r?.length ) {
        this.recipes$.next( r );
        this.isLastRowItem();
        this.isLoaded = true;

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
    // console.log();
    console.group( 'isLastRowItem:' );

    const compareWithNext = ( arr: any = this.recipes$.value ) => {
      for ( let i = 0; i < arr.length - 1; i++ ) {
        const currentItem = arr[i].title[0];
        const nextItem = arr[i + 1].title[0];

        if ( currentItem === nextItem ) {
          // console.log( { currentItem, nextItem } );
          // console.log( `Match found: ${currentItem} matches ${nextItem}` );
          arr[i].showLines = true
        } else {
          // add lines = 'none' here
          arr[i].showLines = false
          // console.log( `No match: ${currentItem} does not match ${nextItem}` );
        }
      }
    }
    compareWithNext();
    console.log( 'list:', this.recipes$.value )
    console.groupEnd();
  }

  /*   onIonInfinite( ev: any ) {
      // this.generateItems();
      setTimeout( () => {
        ( ev as InfiniteScrollCustomEvent ).target.complete();
      }, 500 );
    } */
}
