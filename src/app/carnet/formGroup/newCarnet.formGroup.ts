import { FormGroup, FormControl, Validators } from '@angular/forms';

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

export class FirstFormGroup {
  name= new FormControl('', [Validators.required]);
  lastname= new FormControl('', [Validators.required]);
  //card_code= new FormControl('', [Validators.required]);
  expiration= new FormControl('', [Validators.required]);
  note= new FormControl('',[]);
}


export class SecondFormGroup {
  cedule= new FormControl('', [Validators.required,Validators.minLength(3),Validators.maxLength(8)]);
  extent= new FormControl('', [Validators.required]);
  address= new FormControl('', [Validators.required]);
  //phone= new FormControl('', [Validators.required]);
  cellpone= new FormControl('', [Validators.required]);
}
export class ThirdFormGroup {
  department = new FormControl([],[Validators.required]);
  charge = new FormControl([],[Validators.required]);
  //type_creations= new FormControl('', [Validators.required]);
  textures = new FormControl([],[Validators.required]);
  access_levels = new FormControl([],[Validators.required]);
  genders = new FormControl([],[Validators.required]);
  hair_colors = new FormControl([],[]);
  /*state = new FormControl([],[Validators.required]);
  municipalities= new FormControl('', [Validators.required]);
  parishes= new FormControl('', []);
  skin_colors = new FormControl([],[]);
  civil_statuses = new FormControl([],[Validators.required]);*/
}

export class FourFormGroup {
  state = new FormControl([],[Validators.required]);
  municipalities= new FormControl('', [Validators.required]);
  parishes= new FormControl('', []);
  skin_colors = new FormControl([],[]);
  civil_statuses = new FormControl([],[Validators.required]);
}