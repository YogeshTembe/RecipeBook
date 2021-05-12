import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredients.model';
import{Subject} from 'rxjs';
import { Recipe } from '../recipes/recipe.model';
@Injectable({
  providedIn: 'root'
})
export class ShoppingService {
  ingChanged=new Subject<Ingredient[]>();
  editIng=new Subject<number>();
  ingredients:Ingredient[]=[
    new Ingredient('Apples',5),
    new Ingredient('Tomatoes',10),  ];
  
  addedIng(newIng:Ingredient){
    this.ingredients.push(newIng);
    this.ingChanged.next(this.ingredients.slice());
  }
  getIng(){
    return this.ingredients.slice();
  }
  setIng(ingredients:Ingredient[]){
    this.ingredients=ingredients;
  }
  getIngWithIndex(i:number){
    return this.ingredients[i];
  }
  updateIng(index:number,ing:Ingredient){
    this.ingredients[index]=ing;
    //console.log(index,ing);
    this.ingChanged.next(this.ingredients.slice());
  }
  deleteIng(index:number){
    this.ingredients.splice(index,1);
    this.ingChanged.next(this.ingredients.slice());
  }

  constructor() { }
}
