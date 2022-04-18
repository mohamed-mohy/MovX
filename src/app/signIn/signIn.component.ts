import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signIn',
  templateUrl: './signIn.component.html',
  styleUrls: ['./signIn.component.scss']
})
export class SignInComponent implements OnInit {
  submitLoader: boolean | undefined;
  constructor(private _AuthService:AuthService,private _Router:Router ,private _ToastrService:ToastrService ,) { }

  ngOnInit(): void {
  }

  login:FormGroup=new FormGroup({
    email    : new FormControl(null,[Validators.required,Validators.pattern(/[\w-\.]+@([\w-]+\.)+[\w-]{2,4}/)]),
    password : new FormControl (null,[Validators.required])
  })


loginUser(data:FormGroup)
{

  this.submitLoader = true;
  data.value.email = data.value.email.toLowerCase()


  this._AuthService.loginUser(data.value).subscribe((response)=>{
    if(response.message == 'success')
    {

      setTimeout(() => {
        this.submitLoader = false;

      }, 1000);
      this._ToastrService.success('Registration Success you will redirect to Home page ','success',{
        timeOut:3000
      })
        localStorage.setItem('userToken',response.token)
        this._AuthService.userToken()
      setTimeout(() => {

        this._Router.navigate(['home'],);
      }, 1000);

    }
    else
    {
      setTimeout(() => {
        this.submitLoader = false;
      }, 1000);
      this._ToastrService.error(response.message,'Error!!',{
      timeOut:3000
    })
    }
  })
}
}

