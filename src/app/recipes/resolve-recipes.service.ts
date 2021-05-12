import { Injectable } from '@angular/core';
import{ActivatedRoute, ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import{Recipe} from './recipe.model';
import {DataStorageService} from '../shared/data-storage.service';
import{RecipeService} from './recipe.service';
@Injectable({
  providedIn: 'root'
})
export class ResolveRecipesService implements Resolve<Recipe[]>{

  constructor(private dataStorageService:DataStorageService,private recipeService:RecipeService) { }
  resolve(route:ActivatedRouteSnapshot,state:RouterStateSnapshot){
    let recipe:Recipe[]=this.recipeService.getRecipes();
    if(recipe.length===0){
      return this.dataStorageService.fetchRecipes();
    }
    else{
      return recipe;
    }
  }
}
