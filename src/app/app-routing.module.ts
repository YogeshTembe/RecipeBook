import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadingStrategy, PreloadAllModules } from '@angular/router';



const routes: Routes = [
  {path:'',redirectTo:'recipes',pathMatch:'full'},
  {path:'recipes',loadChildren:()=>import('./recipes/recipe.module').then(m=>m.RecipeModule)},
  {path:'shopping',loadChildren:()=>import('./shopping-list/shopping.module').then(m=>m.ShoppingModule)},
  {path:'auth',loadChildren:()=>import('./auth/auth.module').then(m=>m.AuthModule)},
  {path:'**',redirectTo:'recipes'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
