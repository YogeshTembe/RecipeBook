import { Component, OnInit } from '@angular/core';
import {FormControl,FormGroup} from '@angular/forms';
import{Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthServiceService } from './auth-service.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  authForm:FormGroup;
  isLoginMode=false;
  isLoading=false;
  error:string=null;
  constructor(private authService:AuthServiceService,private router:Router) { }

  onSwitchMode(){
    this.isLoginMode=!this.isLoginMode;
  }

  onCloseModal(){
    this.error=null;
  }

  onSubmit(){
    this.isLoading=true;
    console.log(this.authForm);
    const email=this.authForm.get('email').value;
    const password=this.authForm.get('password').value;
    let authObs:Observable<any>;
    //console.log(email,password);
    if(!this.authForm.valid){
      return;
    }
    if(this.isLoginMode){
      authObs=this.authService.login(email,password);
    }
    else{
      authObs=this.authService.signup(email,password)
    }
    authObs.subscribe(
      data=>{
        console.log(data);
        this.isLoading=false;
        this.router.navigate(['../recipes']);
      },
      errorMsg=>{
        console.log(errorMsg);
        this.isLoading=false;
        this.error=errorMsg;}
    );
  }
  ngOnInit() {
    this.authForm=new FormGroup({
      'email':new FormControl('',[Validators.required,Validators.email]),
      'password':new FormControl('',[Validators.required,Validators.minLength(6)])
    })
  }

}
