
import { Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Ingredient } from 'src/app/shared/ingredients.model';
import{ShoppingService} from '../shopping.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('form',{static:false})userForm:NgForm;
  editedIndex:number;
  editMode:boolean=false;
  editedIng:Ingredient;
  constructor(private shoppingService:ShoppingService) { }

  addOrUpdateIngredient(){
    //console.log(this.userForm.value);
    const i=new Ingredient(this.userForm.value.name,this.userForm.value.amount);
    //console.log(i);
    if(this.editMode){
      this.shoppingService.updateIng(this.editedIndex,i);
      this.editMode=false;
    }
    else{
    this.shoppingService.addedIng(i);
    }
    this.userForm.reset();
  }

  onClear(){
    this.userForm.reset();
    this.editMode=false;
  }
  
  onDelete(){
    this.shoppingService.deleteIng(this.editedIndex);
    this.editMode=false;
    this.userForm.reset();
  }

  ngOnInit() {
    this.shoppingService.editIng.subscribe(
      (index:number)=>{
        this.editedIndex=index;
        this.editMode=true;
        this.editedIng=this.shoppingService.getIngWithIndex(index);
        this.userForm.setValue({
          name:this.editedIng.name,
          amount:this.editedIng.amount
        })
        //console.log(this.editedIng);
      }
    );
  }

}
 