import { ValidatorFn } from '@angular/forms';

export function imageValidator(): ValidatorFn {
  return (control) => {
    const input = String(control.value);

    const isValid = input.endsWith('.jpg') || input.endsWith('.png');

    return isValid ? null : { imageValidator: true };
  };
}
