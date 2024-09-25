import { Injectable } from '@angular/core';
import { CapacitorHttp } from '@capacitor/core';
import { BehaviorSubject, first } from 'rxjs';
import { environment } from 'src/environments/environment';
import * as _ from 'lodash';
import { ReceipesData } from './recipesData';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  // api: string = environment.apiBase; // Local
  api: string = environment.apiBaseRecipes; // Mockaroo
  apiFood = 'http://localhost:3000/api/food'; // MongoDB hitting local server NextJS
  api_Recipes_Edamam = 'http://localhost:3000/api/recipes_eda';
  apiFoodProxy =
    'https://my.api.mockaroo.com/meal_planner_recipes_labels.json?key=6c4d45e0';
  //
  private recipes = new BehaviorSubject<any>([]);
  public recipes$ = this.recipes.asObservable();
  //
  private selectedRecipe = new BehaviorSubject<any>({});
  public selectedRecipe$ = this.selectedRecipe.asObservable();
  //
  private recipes_eda = new BehaviorSubject<any>([]);
  public recipes_eda$ = this.recipes_eda.asObservable();

  constructor() {}

  getLocalRecipes() {
    this.recipes.next(ReceipesData);
  }

  async getLocalRecipesProxy(isBrowser: boolean) {
    if (!isBrowser) {
      this.getRecipesMongoDB();
      return;
    }
    // run proxy or call mockaroo
    const options = {
      url: this.apiFoodProxy,
      headers: { 'X-Custom-Header': 'Value' },
    };
    try {
      const response = await CapacitorHttp.get(options);
      const sortedList = this.alphabetizeList(response.data, 'title');
      console.log('MONGO:', { response, sortedList });
      //
      this.recipes.next(sortedList);
    } catch (error) {
      console.log({ error });
    }
  }

  async getRecipesMongoDB() {
    const options = {
      url: this.apiFood,
      headers: { 'X-Custom-Header': 'Value' },
      // params: { id: '12345' }
    };
    try {
      const response = await CapacitorHttp.get(options);
      const sortedList = this.alphabetizeList(response.data, 'title');
      console.log('MONGO:', { response, sortedList });
      //
      this.recipes.next(sortedList);
    } catch (error) {
      console.log({ error });
    }
  }

  // MongoDB
  async getRecipesEdamamMongoDB() {
    const options = {
      url: this.api_Recipes_Edamam,
      headers: { 'X-Custom-Header': 'Value' },
      // params: { id: '12345' }
    };
    try {
      const response = await CapacitorHttp.get(options);
      const data = response.data;
      console.log({ data });
      const hits = data[0].hits;
      //
      console.group('data');
      console.log('response.data::', data);
      console.log('data.hits', hits);
      //
      const list = hits.map((m: any) => {
        m.recipe.links = m._links;
        return m.recipe;
      });
      const sortedList = this.alphabetizeList(list, 'label');
      console.log('MONGO:Edamam', { response, sortedList, list });
      console.groupEnd();
      //
      this.recipes_eda.next(sortedList);
    } catch (error) {
      console.log({ error });
    }
  }
  // Edamam
  async getRecipesEdamam() {
    const options = {
      url: this.api_Recipes_Edamam,
      headers: { 'X-Custom-Header': 'Value' },
      // params: { id: '12345' }
    };
    try {
      const response = await CapacitorHttp.get(options);
      const data = response.data;
      console.log({ data });
      const hits = data.hits;
      //
      console.group('data');
      console.log('response.data::', data);
      console.log('data.hits', hits);
      //
      const list = hits.map((m: any) => {
        m.recipe.links = m._links;
        return m.recipe;
      });
      const uniq: any = _.uniqBy(list, 'label');
      const sortedList = this.alphabetizeList(uniq, 'label');

      console.log('MONGO:Edamam', { response, sortedList, list });
      console.groupEnd();

      this.recipes_eda.next(sortedList);
    } catch (error) {
      console.log({ error });
    }
  }

  async getRecipes() {
    const options = {
      url: this.api,
      headers: { 'X-Custom-Header': 'Value' },
      // params: { id: '12345' }
    };
    try {
      const response = await CapacitorHttp.get(options);
      const sortedList = this.alphabetizeList(response.data, 'title');
      console.log({ response, sortedList });
      //
      this.recipes.next(sortedList);
    } catch (error) {
      console.log({ error });
    }
  }

  setSelectedRecipe(item: any) {
    this.selectedRecipe.next(item);
  }

  alphabetizeList(list: [], filterBy: string) {
    const sorted = _.sortBy(list, filterBy);
    // console.log( { sorted } );
    return sorted;
  }
}
