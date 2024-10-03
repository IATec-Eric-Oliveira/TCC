import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function samePassword(): ValidatorFn {
  return (formGroup: AbstractControl): ValidationErrors | null => {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { diferent: true };
  };
}
