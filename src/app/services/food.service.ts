import { Injectable } from '@angular/core';
import { CapacitorHttp } from '@capacitor/core';
import { BehaviorSubject, first } from 'rxjs';
import { environment } from 'src/environments/environment';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root',
})
export class FoodService {
  private page = 1;
  private perPage = 10;

  // api: string = environment.apiBase; // Local
  api_Food_MongoDb_Edamam = 'http://localhost:3000/api/food_mongodb';
  api_Recipes_Edamam = 'http://localhost:3000/api/food_eda';

  private selectedFood = new BehaviorSubject<any>({});
  public selectedFood$ = this.selectedFood.asObservable();
  //
  private food = new BehaviorSubject<any>([]);
  public food$ = this.food.asObservable();

  constructor() {}

  public nextPage(url: string) {
    this.page++;
    this.getFoodEdamamNext(url);
  }

  // MongoDB
  async getFoodMongoDB() {
    const options = {
      url: this.api_Food_MongoDb_Edamam,
      headers: { 'X-Custom-Header': 'Value' },
      // params: { id: '12345' }
    };
    try {
      const response = await CapacitorHttp.get(options);
      const sortedList = this.alphabetizeList(response.data, 'title');
      console.log('MONGO:', { response, sortedList });
      //
      this.food.next(sortedList);
    } catch (error) {
      console.log({ error });
    }
  }

  // Edamam Api
  async getFoodEdamam() {
    const options = {
      url: this.api_Recipes_Edamam,
      headers: { 'X-Custom-Header': 'Value' },
      // params: { id: '12345' }
    };
    try {
      const response = await CapacitorHttp.get(options);
      const data = response.data;
      const nextPageUrl = response.data._links;
      // console.log({ data });
      const hints = data.hints;

      //
      console.group('Food Recipes');
      console.log('response.data::', data);
      console.log('data.hints', hints);
      //

      const list = hints.map((m: any) => {
        m.food.measures = m.measures;
        m.food.nextPage = nextPageUrl;
        return m.food;
      });
      const uniq: any = _.uniqBy(list, 'label');
      const sortedList = this.alphabetizeList(uniq, 'label');

      console.log('Food Edamam', { response, sortedList, list, uniq });
      console.groupEnd();

      this.food.next(sortedList);
    } catch (error) {
      console.log({ error });
    }
  }

  private async getFoodEdamamNext(url: any) {
    console.log({ url });
    //
    const options = {
      url: url.href,
      headers: { 'X-Custom-Header': 'Value' },
      // params: { id: '12345' }
    };
    try {
      const response = await CapacitorHttp.get(options);
      const data = response.data;
      const nextPageUrl = response.data._links;
      // console.log({ data });
      const hints = data.hints;

      //
      console.group('Edamam Food');
      console.log('response.data::', data);
      console.log('data.hints', hints);
      //

      const list = hints.map((m: any) => {
        m.food.measures = m.measures;
        m.food.nextPage = nextPageUrl;
        return m.food;
      });
      const uniq: any = _.uniqBy(list, 'label');
      const sortedList = this.alphabetizeList(uniq, 'label');

      console.log('Food Edamam::NEXT', { response, sortedList, list, uniq });
      console.groupEnd();

      this.food.next(sortedList);
    } catch (error) {
      console.log({ error });
    }
  }

  setSelectedRecipe(item: any) {
    this.selectedFood.next(item);
  }

  alphabetizeList(list: [], filterBy: string) {
    const sorted = _.sortBy(list, filterBy);
    // console.log( { sorted } );
    return sorted;
  }
}
