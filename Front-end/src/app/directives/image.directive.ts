import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';
import { imageValidator } from '../utils/image-validator';

@Directive({
  selector: '[appImage]',
  standalone: true,
  providers:[{
    provide: NG_VALIDATORS,
    multi: true,
    useExisting: ImageDirective
  }]
})
export class ImageDirective implements Validator {
@Input() appImage: string = '';

  constructor() {}

  validate(control: AbstractControl): ValidationErrors | null {
    
    const validatorFn = imageValidator();

    return validatorFn(control);
  }
  

}
