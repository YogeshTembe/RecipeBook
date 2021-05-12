import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredients.model';
import{ShoppingService} from './shopping.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  //we will use ingrdients alot in the project so thats why we will add model for ingredients
  ingredients:Ingredient[];
  
  constructor(private shoppingService:ShoppingService) { }

  onEdit(i:number){
    this.shoppingService.editIng.next(i);
  }

  ngOnInit() {
    this.ingredients=this.shoppingService.getIng();
    this.shoppingService.ingChanged.subscribe(
      (ings:Ingredient[])=>{
        this.ingredients=ings;

      }
    ); 
  }
 
}
