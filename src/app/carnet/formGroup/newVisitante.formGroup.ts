import { FormGroup, FormControl, Validators,AbstractControl } from '@angular/forms';



export class CustomValidator{
  // Number only validation
  static numeric(control: AbstractControl) {
    let val = control.value;

    if (val === null || val === '') return null;

    if (!val.toString().match(/^[0-9]+(\.?[0-9]+)?$/)) return { 'invalidNumber': true };

    return null;
  }
}


export class AddVisitorFormGroup {
  name= new FormControl('', [Validators.required]);
  lastname= new FormControl('', [Validators.required]);
  //expiration= new FormControl('', [Validators.required]);
  cedule= new FormControl('', [Validators.required,Validators.minLength(5),CustomValidator.numeric]);
  department = new FormControl('',[Validators.required]);
//  cellpone= new FormControl('', [Validators.required,CustomValidator.numeric,Validators.minLength(10)]);
  access_levels = new FormControl('',[Validators.required]);
}


export class SecondFormGroup {
  //name= new FormControl('', [Validators.required]);
  //lastname= new FormControl('', [Validators.required]);
  card_code= new FormControl('', [Validators.required]);
  //expiration= new FormControl('', [Validators.required]);
  //cedule= new FormControl('', [Validators.required,Validators.minLength(5),CustomValidator.numeric]);
  //department = new FormControl([],[Validators.required]);
//  cellpone= new FormControl('', [Validators.required,CustomValidator.numeric,Validators.minLength(10)]);
  //access_levels = new FormControl([],[Validators.required]);
}
