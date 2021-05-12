import { Injectable } from '@angular/core';
import{HttpClient, HttpParams} from '@angular/common/http';
import { RecipeService } from '../recipes/recipe.service';
import{Recipe} from '../recipes/recipe.model';
import{exhaustMap, map,take,tap} from 'rxjs/operators';
import { AuthServiceService } from '../auth/auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private http:HttpClient,private RecipeService:RecipeService,private authService:AuthServiceService) { }

  storedata(){
    const recipes=this.RecipeService.getRecipes();
    //console.log("before",recipes)
    this.http.put("https://recipe-book-606d8-default-rtdb.firebaseio.com/recipes.json",recipes).subscribe(
      (data)=>{console.log(data);}
    );
  }
  fetchRecipes(){
    return this.http.get<Recipe[]>("https://recipe-book-606d8-default-rtdb.firebaseio.com/recipes.json")
    .pipe(map(recipes=>{
      return recipes.map( recipe=>{
        //console.log({...recipe});
        return {...recipe,ingredients:recipe.ingredients?recipe.ingredients:[]};
      })
    })
    ,tap(recipes=>{{ this.RecipeService.setRecipes(recipes)}}));
  }
}
