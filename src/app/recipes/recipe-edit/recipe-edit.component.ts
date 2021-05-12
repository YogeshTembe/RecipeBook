import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup,ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Recipe } from '../recipe.model';
import{RecipeService} from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css'] 
})
export class RecipeEditComponent implements OnInit {
  id:number;
  editMode:boolean=false;
  recipeForm:FormGroup;
  recipeIngredients=new FormArray([]);
  constructor(private route:ActivatedRoute,private recipeService:RecipeService,private router:Router) { }

  get controls() { // a getter!
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  ngOnInit() {
    this.route.params.subscribe(
      (params:Params)=>{
        this.id=+params['id'];
        this.editMode=params['id']!=null;
        console.log(this.editMode);
      }
    );
    this.initForm();
  }
  private initForm(){
    let recipeName='';
    let recipeDescription='';
    let recipeImageUrl='';
    if(this.editMode){
      const recipe=this.recipeService.getRecipe(this.id);
      recipeName=recipe.name;
      recipeDescription=recipe.description;
      recipeImageUrl=recipe.imagePath;
      if(recipe.ingredients){
        for(let ingredient of recipe.ingredients){
          this.recipeIngredients.push(
            new FormGroup({
              'name':new FormControl(ingredient.name,Validators.required),
            'amount':new FormControl(ingredient.amount,[Validators.required,Validators.pattern(/^[1-9]+[0-9]*$/)])
            })
          )
        }
      }
    }
    this.recipeForm=new FormGroup({
      'name':new FormControl(recipeName,Validators.required),
      'description':new FormControl(recipeDescription,Validators.required),
      'imageUrl':new FormControl(recipeImageUrl,Validators.required),
      "ingredients":this.recipeIngredients
    })
  }

  onAddIng(){
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl(null,Validators.required),
        'amount': new FormControl(null,[Validators.required,Validators.pattern(/^[1-9]+[0-9]*$/)])
      })
    )
  }
  onSubmit(){
    //console.log(this.recipeForm);
    const recipe2=new Recipe(this.recipeForm.value['name'],
    this.recipeForm.value['description'],
    this.recipeForm.value['imageUrl'],
    this.recipeForm.value['ingredients'])
    if(this.editMode){
      this.recipeService.updateRecipe(this.id,recipe2);
    }
    else{
      this.recipeService.addRecipe(recipe2);
    }
    this.router.navigate(['../'],{'relativeTo':this.route});
  }
  cancel(){
    this.router.navigate(['../'],{'relativeTo':this.route});
  }
  deleteIng(iIndex:number){
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(iIndex);
  }
  
}
