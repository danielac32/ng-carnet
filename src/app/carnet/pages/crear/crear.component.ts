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
        ThirdFormGroup,
        FourFormGroup} from '../../formGroup/newCarnet.formGroup'

import {MatStepperModule} from '@angular/material/stepper';
import {CarnetService} from '../services/carnet.service'
import {DepartmentService} from '../services/department.service'
//import {TextureService} from '../services/texture.service'
import {Department} from '../../interface/department.interface'
//import {Texture} from '../../interface/texture.interface'
import {Charge} from '../../interface/charge.interface'
import {ChargeService} from '../services/charge.service'
import {AccessService} from '../services/access.service'
import {Access} from '../../interface/access.interface'
//import {GendersService} from '../services/genders.service'
//import {Gender} from '../../interface/genders.interface'
//import {HairColor} from '../../interface/hair-color.interface'
//import {HairColorService} from '../services/hair-color.service'
//import {SkinColor} from '../../interface/skin-color.interface'
//import {SkinColorService} from '../services/skin-color.service'
import {State} from '../../interface/state.interface'
import {StateService} from '../services/state.service'
//import {Civil} from '../../interface/civil.interface'
//import {CivilService} from '../services/civil.service'
import {Carnet} from '../../interface/carnet.interface'
 
import { Router,NavigationExtras } from '@angular/router';
import { saveAs } from 'file-saver'; // Necesitarás instalar file-saver: npm install file-saver

import {MatAutocompleteModule} from '@angular/material/autocomplete';

import { Observable,of } from 'rxjs';
import { startWith, map } from 'rxjs/operators';


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
      MatStepperModule,
      MatAutocompleteModule
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './crear.component.html',
  styleUrl: './crear.component.css'
})
export class CrearComponent implements OnInit {
 
  imageUrl: string | ArrayBuffer | null = null;
 


//newForm: FormGroup<NewForm>;
firstFormGroup: FormGroup<FirstFormGroup>;
secondFormGroup: FormGroup<SecondFormGroup>;
thirdFormGroup: FormGroup<ThirdFormGroup>;
fourFormGroup: FormGroup<FourFormGroup>;

isLinear = false;
selectedFile?: File;


public department?: Department[] = []
//public texture?: Texture[] = []
public charge?: Charge[] = []
public access?: Access[] = []
//public genders?: Gender[]=[]
//public hair?: HairColor[]=[]
//public skin?: SkinColor[]=[]
public states?: State[]=[]
//public civil?: Civil[]=[]
public uniqueSuffix?:string;


 constructor(/*private _snackBar: MatSnackBar,*/private http: HttpClient) {
    //this.newForm = new FormGroup<NewForm>(new NewForm());
    this.firstFormGroup = new FormGroup<FirstFormGroup>(new FirstFormGroup());
    this.secondFormGroup = new FormGroup<SecondFormGroup>(new SecondFormGroup());
    this.thirdFormGroup = new FormGroup<ThirdFormGroup>(new ThirdFormGroup());
    this.fourFormGroup = new FormGroup<FourFormGroup>(new FourFormGroup());
 }
  
  private _snackBar=inject(MatSnackBar);
  private carnetService=inject(CarnetService);
  private departmentService=inject(DepartmentService);
  //private textureService=inject(TextureService);
  private chargeService=inject(ChargeService);
  private accessService=inject(AccessService);
  //private gendersService=inject(GendersService);
  //private hairColorService=inject(HairColorService);
  //private skinColorService=inject(SkinColorService);
  private stateService=inject(StateService);
  //private civilService=inject(CivilService);
  private router=inject(Router);
 
  selectedDepartment?: { id: number, name: string};

  get filteredDepartment() {
    if (this.selectedDepartment) {
      return this.department?.filter(language => language.name !== this.selectedDepartment!.name);
    } else {
      return this.department;
    }
  }

  onDepartmentSelection(event: any) {
    this.selectedDepartment = event.value;
  }
 

  ngOnInit(): void {
    this.departmentService.findAll().subscribe(({department}) => {
       //console.log(department,"ok")
       this.department=department;
       //console.log(this.department)
    }, error => {
      console.error('Error en la solicitud :', error);
      
    });
   
    /*this.textureService.findAll().subscribe(({texture}) => {
       //console.log(response,"ok")
       this.texture=texture;
       //console.log(this.department)
    }, error => {
      console.error('Error en la solicitud :', error);
      
    });*/
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
   /* this.gendersService.findAll().subscribe(({genders}) => {
       //console.log(response,"ok")
       this.genders=genders;
       //console.log(this.department)
    }, error => {
      console.error('Error en la solicitud :', error);
      
    });*/
    /*this.hairColorService.findAll().subscribe(({hair}) => {
       //console.log(response,"ok")
       this.hair=hair;
       //console.log(this.department)
    }, error => {
      console.error('Error en la solicitud :', error);
      
    });*/
    /*this.skinColorService.findAll().subscribe(({skin}) => {
       //console.log(response,"ok")
       this.skin=skin;
       //console.log(this.department)
    }, error => {
      console.error('Error en la solicitud :', error);
      
    });*/
    this.stateService.findAll().subscribe(({state}) => {
       //console.log(response,"ok")
       this.states=state;
       //console.log(this.department)
    }, error => {
      console.error('Error en la solicitud :', error);
      
    });
    /*this.civilService.findAll().subscribe(({statuses}) => {
       //console.log(response,"ok")
       this.civil=statuses;
       //console.log(this.department)
    }, error => {
      console.error('Error en la solicitud :', error);
      
    });*/
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
     
/*
    const exampleCarnet1: Carnet = {
        name: 'daniel',
        lastname: 'quintero',
        //card_code: '1234567890',
        expiration: new Date( ),
        note: "",

        cedule: '87878877887',
        //extent: extent?? '',
        address: 'los teques',
      // phone: '555-1234',
        cellpone: '04142688881',
        //photo: this.uniqueSuffix as string,
        //qr: 'https://example.com/qr-code.jpg',
        
        department: 1,
        charge: 1,
        type_creations: 1,// ingreso = 1, Renovación = 2 , Extravío =  3
        //textures: Number(textures),
        status: 1,// activo = 1, Inactivo = 2  
        access_levels: 1,
        //genders: Number(genders),
        //hair_colors: Number(hair_colors),
        state: 1,
        municipalities: '',
        parishes: '',
        //skin_colors: Number(skin_colors),
        //civil_statuses: Number(civil_statuses),
        created_at: new Date(),
        //updated_at: new Date('2023-06-27')
    }*/
 
    if (!this.firstFormGroup.valid ||
        !this.secondFormGroup.valid || 
        !this.thirdFormGroup.valid || 
        !this.fourFormGroup.valid) {
        this.openSnackBar("Algunos campos son requeridos", 'Cerrar');
        return;
    }

    const {name,lastname,expiration,note} = this.firstFormGroup.value;
    const {cedule/*,extent*/,address,cellpone} = this.secondFormGroup.value;
    const {department,charge/*,textures*/,access_levels/*,genders,hair_colors*/} = this.thirdFormGroup.value;
    const {state,municipalities,parishes/*,skin_colors,civil_statuses*/}= this.fourFormGroup.value;


    const exampleCarnet: Carnet = {
        name: name?? '',
        lastname: lastname?? '',
        //card_code: '1234567890',
        expiration: new Date(expiration ?? '' ),
        note: note?? '',

        cedule: cedule?? '',
        //extent: extent?? '',
        address: address?? '',
      // phone: '555-1234',
        cellpone: cellpone?? '',
        //photo: this.uniqueSuffix as string,
        //qr: 'https://example.com/qr-code.jpg',
        
        department: Number(department),
        charge: Number(charge),
        type_creations: 1,// ingreso = 1, Renovación = 2 , Extravío =  3
        //textures: Number(textures),
        status: 1,// activo = 1, Inactivo = 2  
        access_levels: Number(access_levels),
        //genders: Number(genders),
        //hair_colors: Number(hair_colors),
        state: Number(state),
        municipalities: municipalities?? '',
        parishes: parishes?? '',
        //skin_colors: Number(skin_colors),
        //civil_statuses: Number(civil_statuses),
        created_at: new Date(),
        //updated_at: new Date('2023-06-27')
    }


    console.log(exampleCarnet)
    if (this.selectedFile) {
        this.carnetService.create(exampleCarnet).subscribe(response => {
            console.log(response)
            //if (this.selectedFile)this.uploadFile(this.selectedFile,cedule);
            if (this.selectedFile && cedule){
                this.carnetService.sendFile(this.selectedFile ,cedule).subscribe(response => {
                   console.log(response)
                   this.openSnackBar("Carnet creado", 'Cerrar');
                   this.downloadCarnet(cedule);
                   //window.location.reload();//
                   this.router.navigate(['/carnet/']);
                }, error => {
                   console.error('Error en la solicitud :sendFile ', error);
                   this.openSnackBar(error.error.message, 'Cerrar');
                   return;
                });
            }
        }, error => {
          console.error('Error en la solicitud :create ', error);
          this.openSnackBar(error.error.message, 'Cerrar');
          return;
        });
    } else {
       console.error('No file selected');
       this.openSnackBar("Seleccione una imagen", 'Cerrar');
       return;
    }

    
    /*const formData = {
      ...this.firstFormGroup.value,
      ...this.secondFormGroup.value,
      ...this.thirdFormGroup.value,
    };*/
  }

  
  showCarnet(cedule: string) {
    this.carnetService.getCarnetBlob(cedule).subscribe((blob) => {
      const reader = new FileReader();
      reader.onload = () => {
        this.imageUrl = reader.result;
      };
      reader.readAsDataURL(blob);
    }, error => {
      console.error('File download error:', error);
      this.openSnackBar("File download error", 'Cerrar');
    });
  }

  
  downloadCarnet(cedule: string) {
    this.carnetService.downloadCarnet(cedule);
    this.carnetService.downloadCarnet2(cedule);
  }


  onDragOver(event: DragEvent) {
    event.preventDefault();
  }


  getFileExtension(filename:string) {
    const match = filename.match(/\.([^.]+)$/);
    if (match) {
      return match[1];
    }
    return ''; // No hay extensión
  }


  onDrop(event: DragEvent) {
    event.preventDefault();
    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      //this.uploadFile(files[0]);
      //console.log("aqui estoy",files[0])
      this.selectedFile = files[0];
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      const ext = this.getFileExtension(this.selectedFile.name);
      const filename = `${uniqueSuffix}${ext}`;
      this.uniqueSuffix=filename;
      console.log(this.uniqueSuffix)
      //console.log(this.selectedFile);
    }
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    const files = input.files;
    if (files && files.length > 0) {
        //this.uploadFile(files[0]);
      //console.log("aqui estoy",files[0])
      this.selectedFile = files[0];
      //console.log(this.selectedFile.name);
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      const ext = this.getFileExtension(this.selectedFile.name);
      const filename = `${uniqueSuffix}${ext}`;
      this.uniqueSuffix=filename;
      console.log(this.uniqueSuffix)
    }
  }

  
  


  uploadFile(file: File) {
   /* this.carnetService.sendFile(file).subscribe(response => {
       console.log(response,"ok")
    }, error => {
      console.error('Error en la solicitud :', error);
    });*/

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
