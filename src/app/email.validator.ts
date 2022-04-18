import { delay, map } from 'rxjs/operators';
import { AsyncValidatorFn ,AbstractControl,ValidationErrors } from "@angular/forms";
import { Observable } from "rxjs";
import { ajax } from "rxjs/ajax";
export function EmailValidator(): AsyncValidatorFn {
  return (control:AbstractControl):Observable<ValidationErrors| null> =>{
    return getAllUsers().pipe(
      map(res =>{
        let col:any[]=[] ;

        for(var i =0 ;i < res.citizens.length;i++ )
        {
          col.push(res.citizens[i].email)
          if( col[i] == control.value.toLowerCase())
          {
            col[0] = res.citizens[i].email
          }


        }

          return col[0] == control.value.toLowerCase() ?{emailExist:true}: null;


      })
    )
  }


}
  function getAllUsers():Observable<any>
  {
    return ajax.getJSON('https://routeegypt.herokuapp.com/getAllUsers').pipe(delay(1000))
  }
