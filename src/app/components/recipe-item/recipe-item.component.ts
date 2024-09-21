import { Component, input, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RecipeService } from 'src/app/services/recipe.service';

@Component( {
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.scss'],
} )
export class RecipeItemComponent implements OnInit {
  @Input() recipe: any = {}
  @Input() letter: string = '';
  @Input() index: number | null = null;
  showRowLine = "inset";
  favIcon = false;
  foodGroup = [];
  imgUrl = '';

  constructor(
    private readonly recipeSvc: RecipeService,
    private readonly router: Router
  ) { }

  ngOnInit() {
    this.showRowLine = this.recipe.showLines ? "inset" : "none"; // inset, full, or none
    const foodGroup = this.recipe.ingredients[0].item.foodGroup;
    this.foodGroup = foodGroup;
    this.imgUrl = this.recipe.imgSet.large;
    this.favIcon = this.recipe.isRecipeFavorite;
    // console.log( { foodGroup } );
  }

  onClick() {
    // send selected recipe to recipeService
    this.recipeSvc.setSelectedRecipe( this.recipe );
    this.router.navigate( ['/recipe-details'] );
  }

  onToggleFavIcon( event: any ) {
    // heart - outline || heart    
    this.favIcon = !this.favIcon;
    console.log( 'this.favIcon', this.favIcon, { event } );
    event.preventDefault();
  }
}
