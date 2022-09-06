import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Recipe } from './recipe.model';

@Injectable()
export class RecipeService {

  recipesChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [
    new Recipe(
      'A Delicious Pancake',
      'A Pancake with the honey, fruits and nuts',
      'https://cdn.pixabay.com/photo/2018/01/22/16/28/pancake-3099315_960_720.jpg',
      
      [
        new Ingredient('Mini Pancake', 10),
        new Ingredient('Nuts', 10),
        new Ingredient('Fruits', 10),
      ]
    ),
    new Recipe(
      'Bread Omelette',
      'A Bread omelette with bean and a cup of coffee',
      'https://cdn.pixabay.com/photo/2016/11/18/14/39/beans-1834984_960_720.jpg',
      [
        new Ingredient('Rosted Bread', 2),
        new Ingredient('Half-boiled egg', 2),
        new Ingredient('Bean', 25),
      ]
    ),
    new Recipe(
      'Korean Bibim Noodles',
      'Hot and spicy korean bibim noodles',
      'https://cdn.pixabay.com/photo/2015/04/06/16/21/korean-food-709606_960_720.jpg',
      [
        new Ingredient('Noodle', 200),
        new Ingredient('Chilli Pepper', 5),
        new Ingredient('Kimichi', 10),
        new Ingredient('Onion', 2),
        new Ingredient('Egg', 1),
      ]
    ),
  ];

  constructor(private slService: ShoppingListService) {}

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }

  addRecipe(recipe:Recipe){
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }
  updateRecipe(index:number, newRecipe:Recipe){
    this.recipes[index]=newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index:number){
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
}
