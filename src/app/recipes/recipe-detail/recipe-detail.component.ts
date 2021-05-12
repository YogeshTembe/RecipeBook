import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../recipe.model';
import{ShoppingService} from '../../shopping-list/shopping.service';
import{Router,ActivatedRoute, Params} from '@angular/router';
import{RecipeService} from '../../recipes/recipe.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipedata:Recipe;
  id:number;
  constructor(private shoppingService:ShoppingService,private route:ActivatedRoute,private router:Router,private recipeService:RecipeService) { }
  gotoshopping(){
    this.shoppingService.setIng(this.recipedata.ingredients); 
    this.router.navigate(['shopping']);
  }
  ngOnInit() { 
    //console.log("yes");
    let id=this.route.params.subscribe(
      (params:Params)=>{
        this.id=+params['id'];
        this.recipedata=this.recipeService.getRecipe(this.id);
      }
    )
    
  }

  deleteRecipe(){
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['../'],{'relativeTo':this.route});
  }

}
