import { Directive, Input } from '@angular/core';
import {
  AbstractControl,
  NG_VALIDATORS,
  ValidationErrors,
  Validator,
} from '@angular/forms';
import { isNumberValidator } from '../utils/number-validator';

@Directive({
  selector: '[appNumber]',
  standalone: true,
  providers: [
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: NumberDirective,
    },
  ],
})
export class NumberDirective implements Validator {
  @Input() appNumber: string = '';

  constructor() {}


  validate(control: AbstractControl): ValidationErrors | null {

    
    const validatorFn = isNumberValidator();
    return validatorFn(control);
  }
}
