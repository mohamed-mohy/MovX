// import { AbstractControl, FormGroup, ValidationErrors } from '@angular/forms';

// // custom validator to check that two fields match
// export function MustMatch(control: AbstractControl): ValidationErrors | null  {
//     return (formGroup: FormGroup) => {
//         const password = control.get('password')?.value;
//         const confirmPassword = control.get('confirmPassword')?.value;

//         if (password.errors && !confirmPassword.errors['mustMatch']) {
//             // return if another validator has already found an error on the matchingControl
//             return;
//         }

//         // set error on matchingControl if validation fails
//         if (password.value !== confirmPassword.value) {
//           confirmPassword.setErrors({ mustMatch: true });
//         } else {
//           confirmPassword.setErrors(null);
//         }
//     }
// }


import { AbstractControl, ValidatorFn } from '@angular/forms';

export default class Validation {
  static match(controlName: string, checkControlName: string): ValidatorFn {
    return (controls: AbstractControl) => {
      const control = controls.get(controlName);
      const checkControl = controls.get(checkControlName);

      if (checkControl?.errors && !checkControl.errors['matching']) {
        return null;
      }

      if (control?.value !== checkControl?.value) {
        controls.get(checkControlName)?.setErrors({ matching: true });
        return { matching: true };
      } else {
        return null;
      }
    };
  }
}
