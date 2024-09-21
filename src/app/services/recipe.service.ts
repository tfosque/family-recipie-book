import { Injectable } from '@angular/core';
import { CapacitorHttp } from '@capacitor/core';
import { BehaviorSubject, first } from 'rxjs';
import { environment } from 'src/environments/environment';
import * as _ from 'lodash';
import { ReceipesData } from './recipesData';


@Injectable( {
  providedIn: 'root'
} )
export class RecipeService {
  // api: string = environment.apiBase;
  api: string = environment.apiBaseRecipes;
  private recipes = new BehaviorSubject<any>( [] );
  public recipes$ = this.recipes.asObservable();
  //

  private selectedRecipe = new BehaviorSubject<any>( {} );
  public selectedRecipe$ = this.selectedRecipe.asObservable();
  constructor() { }

  getLocalRecipes() {
    this.recipes.next( ReceipesData );
  }

  async getRecipes() {
    const options = {
      url: this.api,
      headers: { 'X-Custom-Header': 'Value' },
      // params: { id: '12345' }
    };
    const response = await CapacitorHttp.get( options );

    const sortedList = this.alphabetizeList( response.data );
    console.log( { response, sortedList } );

    this.recipes.next( sortedList );
  }

  setSelectedRecipe( item: any ) {
    this.selectedRecipe.next( item );
  }

  alphabetizeList( list: [] ) {
    const sorted = _.sortBy( list, 'title' );
    // console.log( { sorted } );
    return sorted
  }

}
