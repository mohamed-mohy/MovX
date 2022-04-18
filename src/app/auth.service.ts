import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import jwtDecode from 'jwt-decode';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userData:BehaviorSubject<any>=new BehaviorSubject(null);
  token:any
  constructor(private _HttpClient:HttpClient, private _Router:Router) {
    if( localStorage.getItem('userToken') != null)
    {
      this.userToken()

    }
  }

  registerUser(user:object):Observable<any>
  {
    return this._HttpClient.post('https://routeegypt.herokuapp.com/signup',user);
  }
  loginUser(user:object):Observable<any>
  {
    return this._HttpClient.post('https://routeegypt.herokuapp.com/signin',user);
  }


  userToken(){
    this.token=localStorage.getItem('userToken')
    this.userData.next(jwtDecode(this.token))
  }
  logoutFn()
  {
    localStorage.removeItem('userToken')
    this.userData.next(null)
  }
}
