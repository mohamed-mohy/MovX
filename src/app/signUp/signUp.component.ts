import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { EmailValidator } from '../email.validator';
import Validation from '../password.validator';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signUp',
  templateUrl: './signUp.component.html',
  styleUrls: ['./signUp.component.scss']
})
export class SignUpComponent implements OnInit {
  submitLoader: boolean | undefined;

  constructor(private _AuthService:AuthService ,private _ToastrService:ToastrService ,private _Router:Router) { }

signUp:FormGroup=new FormGroup({
  first_name:new FormControl(null,[Validators.required,Validators.minLength(3),Validators.maxLength(16),Validators.pattern(/^[a-zA-Z]+$/)]),
      last_name:new FormControl(null,[Validators.required,Validators.minLength(3),Validators.maxLength(16),Validators.pattern(/^[a-zA-Z]+$/)]),
      email:new FormControl(null,[Validators.required,Validators.email,Validators.pattern(/[\w-\.]+@([\w-]+\.)+[\w-]{2,4}/)],[EmailValidator()]),
      age:new FormControl(null,[Validators.required,Validators.min(16),Validators.max(80),Validators.pattern(/^(1[89]|[2-9]\d)$/)]),
      password:new FormControl(null,[Validators.required,Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)]),
      confirmPassword:new FormControl(null,[Validators.required,Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)])
    }, {
      validators: [Validation.match('password', 'confirmPassword')]
    }
);

  ngOnInit(): void {

  }
  get f(): { [key: string]: AbstractControl } {
    return this.signUp.controls;
  }

  signUpUser(data:FormGroup){
    this.submitLoader = true;
    delete data.value.confirmPassword;
    data.value.email = data.value.email.toLowerCase()

    this._AuthService.registerUser(data.value).subscribe((response)=>{

      if(response.message == 'success')
      {
        setTimeout(() => {
          this.submitLoader = false;
        }, 1000);
        this._ToastrService.success('Registration Success you will redirect to sing in page after 2 sec.','success')
        setTimeout(() => {
          this._Router.navigate(['signIn'])
        }, 2000);
      }
    })
  }


}
