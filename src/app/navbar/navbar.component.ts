import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { GetService } from '../get.service';


AuthService
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  firstName: any;
  lastName: any;
  isLogin:any
  results:any
  k:any
  originalPath : string='https://image.tmdb.org/t/p/original';
  search :FormGroup = new FormGroup({
    searchInput:new FormControl(null)
  })
  constructor( private _AuthService:AuthService ,private _Router:Router,private _GetService:GetService) { }

  ngOnInit(): void {
    this._AuthService.userData.subscribe(()=>{
      if(this._AuthService.userData.getValue() == null)
      {
        this.isLogin=false

      }
      else
      {
        this.firstName =this._AuthService.userData.getValue().first_name
        this.lastName = this._AuthService.userData.getValue().last_name
        this.isLogin=true
      }
    })
  }
logout(){
  this._AuthService.logoutFn()
  this.isLogin =false
  this._Router.navigate(['signIn'])

}

getSearch(search:FormGroup){

   this.k= this._GetService.search(search.value.searchInput).subscribe((response)=>{
      this.results =response.results
    })
    if (this.search.value.searchInput.length == 0) {
      this.k.unsubscribe();

    }
}
}
