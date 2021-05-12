import { Component, OnInit,Output,EventEmitter, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthServiceService } from '../auth/auth-service.service';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit,OnDestroy {
  isAuthenticated:boolean=false;
  authSub:Subscription;
  collapsed=true;
  constructor(private dataStorageService:DataStorageService,private authService:AuthServiceService) { }
  
  saveAllRecipes(){
    this.dataStorageService.storedata();
  }
  fetchAllRecipes(){
    this.dataStorageService.fetchRecipes().subscribe();
  }

  onLogout(){
    this.authService.logout();
  }
  ngOnInit() {
    this.authSub=this.authService.user.subscribe(
      user=>{this.isAuthenticated=!!user;}
    )
  }

  ngOnDestroy(){
    this.authSub.unsubscribe();
    
  }

}
