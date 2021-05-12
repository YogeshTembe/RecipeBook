import { Injectable } from '@angular/core';
import{HttpClient, HttpClientModule, HttpErrorResponse} from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { BehaviorSubject, Subject, throwError } from 'rxjs';
import { User } from './user.model';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  user=new BehaviorSubject<User>(null);

  private expirationTimer:any;

  constructor(private http:HttpClient,private router:Router) { }

  login(email,password){
    return this.http.post<any>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key='+environment.firebaseAPIKey,
    {email:email,password:password,returnSecureToken:true}).pipe(catchError(this.handleError),tap(resData=>
      {
        this.handleAuthentication(resData.email,resData.localId,resData.idToken,+resData.expiresIn);
      }));
  }

  autoLogin(){
    const userData:{email:string,id:string,_token:string,expirationDate:string}=JSON.parse(localStorage.getItem('userData'));
    if(!userData){return;}
    const loadedUser=new User(userData.email,userData.id,userData._token,new Date(userData.expirationDate));
    this.user.next(loadedUser);
    let expirationTime=new Date(userData.expirationDate).getTime()-new Date().getTime();
    this.autoLogout(expirationTime);
  }

  logout(){
    this.user.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
    if(this.expirationTimer){clearTimeout(this.expirationTimer);}
  }

  autoLogout(expirationTime:number){
    console.log(expirationTime);
    this.expirationTimer=setTimeout(()=>{
      this.logout()
    },expirationTime);
  }

  signup(email:string,password:string){
    return this.http.post<any>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key='+environment.firebaseAPIKey,
    {email:email,password:password,returnSecureToken:true}
    ).pipe(catchError(this.handleError),tap(resData=>
      {
        this.handleAuthentication(resData.email,resData.localId,resData.idToken,+resData.expiresIn);
      }));
  }

  private handleError(errorRes:HttpErrorResponse){
    let errorMsg="An Unknown Error Occured!";
    if(!errorRes.error || !errorRes.error.error){
      return throwError(errorMsg);
    }
    switch(errorRes.error.error.message){
      case "EMAIL_EXISTS":
        errorMsg="The email address is already in use by another account.";
        break;
      case "OPERATION_NOT_ALLOWED":
        errorMsg="Password sign-in is disabled for this project.";
        break;
      case "TOO_MANY_ATTEMPTS_TRY_LATER":
        errorMsg="We have blocked all requests from this device due to unusual activity. Try again later.";
        break;
      case "EMAIL_NOT_FOUND":
        errorMsg="There is no user record corresponding to this identifier.";
        break;
      case "INVALID_PASSWORD":
        errorMsg="The password is invalid or the user does not have a password.";
        break;
      case "USER_DISABLED":
        errorMsg="The user account has been disabled by an administrator.";
        break;
    }
    return throwError(errorMsg);

  }

  private handleAuthentication(email:string,id:string,token:string,expiresIn:number){
    let expirationDate=new Date(new Date().getTime()+expiresIn*1000);
    const user=new User(email,id,token,expirationDate);
    this.user.next(user);
    this.autoLogout(expiresIn*1000);
    localStorage.setItem('userData',JSON.stringify(user));
  }
}

