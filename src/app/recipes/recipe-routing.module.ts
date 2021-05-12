
import { NgModule } from "@angular/core";
import { Routes, RouterModule  } from "@angular/router";
import { AuthGuard } from "../auth/auth.guard";
import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { RecipeStartComponent } from "./recipe-start/recipe-start.component";
import { RecipesComponent } from "./recipes.component";
import { ResolveRecipesService } from "./resolve-recipes.service";


const routes:Routes=[
    {path:'', component:RecipesComponent,canActivate:[AuthGuard],
    children:[
      {path:'',component:RecipeStartComponent},
      {path:'new',component:RecipeEditComponent},
      {path:':id',component:RecipeDetailComponent,resolve:[ResolveRecipesService]},
      {path:':id/edit',component:RecipeEditComponent,resolve:[ResolveRecipesService]}
    ]}
]
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RecipeRoutingModule {}