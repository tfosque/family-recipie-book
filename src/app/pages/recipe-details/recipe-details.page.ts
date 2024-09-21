import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { RecipeService } from 'src/app/services/recipe.service';


@Component( {
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.page.html',
  styleUrls: ['./recipe-details.page.scss'],
} )
export class RecipeDetailsPage implements OnInit {
  selectedRecipe = new BehaviorSubject<any>( {} );


  constructor(
    private readonly recipeSvc: RecipeService
  ) { }

  ngOnInit() {
    this.recipeSvc.selectedRecipe$.subscribe( ( item: any ) => {
      console.log( { item } );
      this.selectedRecipe.next( item );
    } )
  }

}
