import { ValidatorFn } from '@angular/forms';

export function emailValidator(domains: string[]): ValidatorFn {
  const domaindStr = domains.join('|');
  const regExp = new RegExp(`[A-Za-z0-9]+@[a-z]+\.(${domaindStr})`);

  return (control) => {
    const isInvalid = control.value === '' || regExp.test(control.value);

    return isInvalid ? null : { emailValidator: true };
  };
}
