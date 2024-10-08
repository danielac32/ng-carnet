import { FormGroup, FormControl, Validators,AbstractControl } from '@angular/forms';

/*export class NewForm {
  name= new FormControl('', [Validators.required]);
  lastname= new FormControl('', [Validators.required]);
  card_code= new FormControl('', [Validators.required]);
  expiration= new FormControl('', [Validators.required]);
  note= new FormControl('', [Validators.required]);
  cedule= new FormControl('', [Validators.required]);
  extent= new FormControl('', [Validators.required]);
  address= new FormControl('', [Validators.required]);
  phone= new FormControl('', [Validators.required]);
  cellpone= new FormControl('', [Validators.required]);
  //photo= new FormControl('', [Validators.required]);
  //qr= new FormControl('', [Validators.required]);
  department = new FormControl([],[]);
  charge = new FormControl([],[]);
  type_creations= new FormControl('', [Validators.required]);
  textures = new FormControl([],[]);
  access_levels = new FormControl([],[]);
  genders = new FormControl([],[]);
  hair_colors = new FormControl([],[]);
  state = new FormControl([],[]);
  municipalities= new FormControl('', [Validators.required]);
  parishes= new FormControl('', [Validators.required]);
  skin_colors = new FormControl([],[]);
  civil_statuses = new FormControl([],[]);
}*/



export class CustomValidator{
  // Number only validation
  static numeric(control: AbstractControl) {
    let val = control.value;

    if (val === null || val === '') return null;

    if (!val.toString().match(/^[0-9]+(\.?[0-9]+)?$/)) return { 'invalidNumber': true };

    return null;
  }
}


export class FirstFormGroup {
  name= new FormControl('', [Validators.required]);
  lastname= new FormControl('', [Validators.required]);
  //card_code= new FormControl('', [Validators.required]);
  expiration= new FormControl('', [Validators.required]);
  note= new FormControl('',[]);
}

export class SecondFormGroup {
  cedule= new FormControl('', [Validators.required,Validators.minLength(5),CustomValidator.numeric]);
  //extent= new FormControl('', [Validators.required,Validators.minLength(4),Validators.maxLength(4),CustomValidator.numeric]);
  address= new FormControl('', [Validators.required]);
  //phone= new FormControl('', [Validators.required]);
  cellpone= new FormControl('', [Validators.required,CustomValidator.numeric,Validators.minLength(10)]);
  card_code= new FormControl('', [Validators.required,CustomValidator.numeric,Validators.minLength(1),Validators.maxLength(10)]);
}

export class ThirdFormGroup {
  //department = new FormControl([],[Validators.required]);
  //charge = new FormControl([],[Validators.required]);
  department = new FormControl([]);
  charge = new FormControl([]);

  //type_creations= new FormControl('', [Validators.required]);
  //textures = new FormControl([],[Validators.required]);
  access_levels = new FormControl([]);//access_levels = new FormControl([],[Validators.required]);
  //genders = new FormControl([],[Validators.required]);
  //hair_colors = new FormControl([],[]);
}

export class FourFormGroup {
  state = new FormControl([]);//state = new FormControl([],[Validators.required]);
  //municipalities= new FormControl('', [Validators.required]);
  //parishes= new FormControl('', [Validators.required]);
  //skin_colors = new FormControl([],[]);
  //civil_statuses = new FormControl([],[Validators.required]);
}