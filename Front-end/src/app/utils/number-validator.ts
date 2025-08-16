import { ValidatorFn } from '@angular/forms';

export function isNumberValidator(): ValidatorFn {
  return (control) => {
    return isFinite(control.value) ? null : { isNumberValidator: true };
  };
}
