import { ValidatorFn } from '@angular/forms';

export function matchPasswordValidator(
  passwordControlName: string,
  rePasswordControlName: string
): ValidatorFn {
  return (control) => {
    const passwordFormControl = control.get(passwordControlName);
    const rePasswordFormControl = control.get(rePasswordControlName);

    const passwardMatching =
      passwordFormControl?.value === rePasswordFormControl?.value;

  
      

    return passwardMatching ? null : { matchPasswordValidator: true };
  };
}
