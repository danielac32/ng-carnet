import { Component ,OnInit,inject} from '@angular/core';
 

import { HttpClient } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms'; // Import FormsModule
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card'; // Import MatCardModule
import {MatCheckboxModule} from '@angular/material/checkbox';
import {CdkTextareaAutosize, TextFieldModule} from '@angular/cdk/text-field';
import {MatSelectModule} from '@angular/material/select';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {provideNativeDateAdapter} from '@angular/material/core';
import {MatListModule} from '@angular/material/list';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {
        FirstFormGroup,
        SecondFormGroup,
        ThirdFormGroup} from '../../formGroup/newCarnet.formGroup'

import {MatStepperModule} from '@angular/material/stepper';
import {CarnetService} from '../services/carnet.service'
import {DepartmentService} from '../services/department.service'
import {TextureService} from '../services/texture.service'
import {Department} from '../../interface/department.interface'
import {Texture} from '../../interface/texture.interface'
import {Charge} from '../../interface/charge.interface'
import {ChargeService} from '../services/charge.service'
import {AccessService} from '../services/access.service'
import {Access} from '../../interface/access.interface'
import {GendersService} from '../services/genders.service'
import {Gender} from '../../interface/genders.interface'
import {HairColor} from '../../interface/hair-color.interface'
import {HairColorService} from '../services/hair-color.service'
import {SkinColor} from '../../interface/skin-color.interface'
import {SkinColorService} from '../services/skin-color.service'
import {State} from '../../interface/state.interface'
import {StateService} from '../services/state.service'
import {Civil} from '../../interface/civil.interface'
import {CivilService} from '../services/civil.service'
 
@Component({
  selector: 'app-crear',
  standalone: true,
  imports: [
      MatFormFieldModule,
      MatInputModule,
      MatButtonModule,
      FormsModule, // Import FormsModule
      ReactiveFormsModule, // Import ReactiveFormsModule
      CommonModule,
      MatCardModule,
      MatCheckboxModule,
      MatSelectModule, 
      TextFieldModule,
      MatDatepickerModule,
      MatListModule,
      MatProgressBarModule,
      MatStepperModule
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './crear.component.html',
  styleUrl: './crear.component.css'
})
export class CrearComponent implements OnInit {
 

//newForm: FormGroup<NewForm>;
firstFormGroup: FormGroup<FirstFormGroup>;
secondFormGroup: FormGroup<SecondFormGroup>;
thirdFormGroup: FormGroup<ThirdFormGroup>;
isLinear = false;
selectedFile?: File;


public department?: Department[] = []
public texture?: Texture[] = []
public charge?: Charge[] = []
public access?: Access[] = []
public genders?: Gender[]=[]
public hair?: HairColor[]=[]
public skin?: SkinColor[]=[]
public states?: State[]=[]
public civil?: Civil[]=[]

 constructor(/*private _snackBar: MatSnackBar,*/private http: HttpClient) {
    //this.newForm = new FormGroup<NewForm>(new NewForm());
    this.firstFormGroup = new FormGroup<FirstFormGroup>(new FirstFormGroup());
    this.secondFormGroup = new FormGroup<SecondFormGroup>(new SecondFormGroup());
    this.thirdFormGroup = new FormGroup<ThirdFormGroup>(new ThirdFormGroup());

 }
  
  private _snackBar=inject(MatSnackBar);
  private carnetService=inject(CarnetService);
  private departmentService=inject(DepartmentService);
  private textureService=inject(TextureService);
  private chargeService=inject(ChargeService);
  private accessService=inject(AccessService);
  private gendersService=inject(GendersService);
  private hairColorService=inject(HairColorService);
  private skinColorService=inject(SkinColorService);
  private stateService=inject(StateService);
  private civilService=inject(CivilService);
  
 


  ngOnInit(): void {
    this.departmentService.findAll().subscribe(({department}) => {
       //console.log(department,"ok")
       this.department=department;
       //console.log(this.department)
    }, error => {
      console.error('Error en la solicitud :', error);
      
    });
    this.textureService.findAll().subscribe(({texture}) => {
       //console.log(response,"ok")
       this.texture=texture;
       //console.log(this.department)
    }, error => {
      console.error('Error en la solicitud :', error);
      
    });
    this.chargeService.findAll().subscribe(({charge}) => {
       //console.log(response,"ok")
       this.charge=charge;
       //console.log(this.department)
    }, error => {
      console.error('Error en la solicitud :', error);
      
    });
    this.accessService.findAll().subscribe(({access}) => {
       //console.log(response,"ok")
       this.access=access;
       //console.log(this.department)
    }, error => {
      console.error('Error en la solicitud :', error);
      
    });
    this.gendersService.findAll().subscribe(({genders}) => {
       //console.log(response,"ok")
       this.genders=genders;
       //console.log(this.department)
    }, error => {
      console.error('Error en la solicitud :', error);
      
    });
    this.hairColorService.findAll().subscribe(({hair}) => {
       //console.log(response,"ok")
       this.hair=hair;
       //console.log(this.department)
    }, error => {
      console.error('Error en la solicitud :', error);
      
    });
    this.skinColorService.findAll().subscribe(({skin}) => {
       //console.log(response,"ok")
       this.skin=skin;
       //console.log(this.department)
    }, error => {
      console.error('Error en la solicitud :', error);
      
    });
    this.stateService.findAll().subscribe(({state}) => {
       //console.log(response,"ok")
       this.states=state;
       //console.log(this.department)
    }, error => {
      console.error('Error en la solicitud :', error);
      
    });
    this.civilService.findAll().subscribe(({statuses}) => {
       //console.log(response,"ok")
       this.civil=statuses;
       //console.log(this.department)
    }, error => {
      console.error('Error en la solicitud :', error);
      
    });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000, // Duración en milisegundos
      verticalPosition: 'top', // Posición vertical de la alerta
      horizontalPosition: 'end', // Posición horizontal de la alerta
      panelClass: ['green']
    });
  }



  onSubmit() {
    if (!this.firstFormGroup.valid && !this.secondFormGroup.valid && !this.thirdFormGroup.valid) return;
 

    /*const formData = {
      ...this.firstFormGroup.value,
      ...this.secondFormGroup.value,
      ...this.thirdFormGroup.value,
    };*/
      


     
  }


 

  onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      //this.uploadFile(files[0]);
      //console.log("aqui estoy",files[0])
      this.selectedFile = files[0];
     
    }
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    const files = input.files;
    if (files && files.length > 0) {
        //this.uploadFile(files[0]);
      //console.log("aqui estoy",files[0])
      this.selectedFile = files[0];
     
    }
  }

  
  


  uploadFile(file: File) {
    this.carnetService.sendFile(file).subscribe(response => {
       console.log(response,"ok")
        
    }, error => {
      console.error('Error en la solicitud :', error);
    });

    /*const formData = new FormData();
    formData.append('file', file);
    this.http.post('http://localhost:3000/upload', formData)
      .subscribe(response => {
        console.log('Upload success', response);
      }, error => {
        console.error('Upload error', error);
      });*/

  }
}
