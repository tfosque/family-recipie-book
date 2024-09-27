import { Injectable } from '@angular/core';
import { CapacitorHttp } from '@capacitor/core';
import { BehaviorSubject, first } from 'rxjs';
import { environment } from 'src/environments/environment';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root',
})
export class SpoonacularService {
  private page = 1;
  private perPage = 40;

  // api: string = environment.apiBase; // Local
  api_Food_MongoDb_Spoonacular =
    'http://localhost:3000/api/spoonacular_mongodb';

  private selectedFood = new BehaviorSubject<any>({});
  public selectedFood$ = this.selectedFood.asObservable();
  //
  private food = new BehaviorSubject<any>([]);
  public food$ = this.food.asObservable();

  constructor() {}

  public nextPage(url: string) {
    this.page++;
    this.getFoodSpoonacularNext(url);
  }

  //  Spoonacular Api: Mongo for now
  async getFoodSpoonacular() {
    const options = {
      url: this.api_Food_MongoDb_Spoonacular,
      headers: { 'X-Custom-Header': 'Value' },
      // params: { id: '12345' }
    };
    try {
      const response = await CapacitorHttp.get(options);
      const data = response.data[0].results;
      // const nextPageUrl = response.data._links;
      // console.log({ data }, 'xResults:', data);

      //
      console.group('Spoonacular Food:');
      // console.log('response.data.results:', data);
      //

      /*  const list = data.map((m: any) => {
        m.food.measures = m.measures;
        // m.food.nextPage = nextPageUrl;
        return m.food;
      }); */
      const uniq: any = _.uniqBy(data, 'id');
      const sortedList = this.alphabetizeList(uniq, 'title');

      console.log('Food ', { response, sortedList, data, uniq });
      console.groupEnd();

      this.food.next(sortedList);
    } catch (error) {
      console.log({ error });
    }
  }

  private async getFoodSpoonacularNext(url: any) {
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
      console.group(' Food');
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

      console.log('Food ::NEXT', { response, sortedList, list, uniq });
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
