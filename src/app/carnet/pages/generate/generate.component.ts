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
import {FirstFormGroup} from '../../formGroup/newAsesor.formGroup'
import {SecondFormGroup} from '../../formGroup/newVisitante.formGroup'
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
import {State} from '../../interface/state.interface'
import {StateService} from '../services/state.service'
import {Carnet} from '../../interface/carnet.interface'
import { Router,NavigationExtras } from '@angular/router';
import { saveAs } from 'file-saver'; // Necesitarás instalar file-saver: npm install file-saver
import {MatAutocompleteModule} from '@angular/material/autocomplete';

import { Observable,of } from 'rxjs';
import { startWith, map } from 'rxjs/operators';


@Component({
  selector: 'app-generate',
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
  templateUrl: './generate.component.html',
  styleUrl: './generate.component.css'
})
export class GenerateComponent implements OnInit {
 
  imageUrl: string | ArrayBuffer | null = null;
 

secondFormGroup: FormGroup<SecondFormGroup>;
//newForm: FormGroup<NewForm>;
firstFormGroup: FormGroup<FirstFormGroup>;

isLinear = false;
selectedFile?: File;


public department?: Department[] = []
public access?: Access[] = []
public uniqueSuffix?:string;


 constructor() {
    this.firstFormGroup = new FormGroup<FirstFormGroup>(new FirstFormGroup());
    this.secondFormGroup = new FormGroup<SecondFormGroup>(new SecondFormGroup());
 }
  
  private _snackBar=inject(MatSnackBar);
  private carnetService=inject(CarnetService);
  private departmentService=inject(DepartmentService);
  private chargeService=inject(ChargeService);
  private accessService=inject(AccessService);
  private stateService=inject(StateService);
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
   

    this.accessService.findAll().subscribe(({access}) => {
       //console.log(response,"ok")
       this.access=access;
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

    if (!this.firstFormGroup.valid ) {
        this.openSnackBar("Algunos campos son requeridos", 'Cerrar');
        return;
    }

    const { name,lastname,expiration,cedule,cellpone,card_code,department,access_levels} = this.firstFormGroup.value;

    const exampleCarnet: Carnet = {
        name: name?? '',
        lastname: lastname?? '',
        expiration: new Date(expiration ?? '' ),
        note:'',
        cedule: cedule?? '',
        //address: address?? '',
        cellpone: cellpone?? '',
        card_code: card_code?? '',
        department: Number(department),
        charge: Number(30),//asesor 30,visitante 31
        type_creations: 1,// ingreso = 1, Renovación = 2 , Extravío =  3
        status: 1,// activo = 1, Inactivo = 2  
        access_levels: Number(access_levels),
       // state: Number(state),
        created_at: new Date(),
    }

    /*this.carnetService.checkCardCode(card_code!).subscribe(response => {
      // console.log(response.status)
       if(response.status===200){ // si responde 200 ya existe un carnet con ese codigo de barra
                                  // retornamos error para no crear carnet con un mismo numero
         this.openSnackBar("Ya existe un carnet con ese Codigo: "+card_code , 'Cerrar');   
        // this.router.navigate(['/carnet/list']);
         return;             
       }else if(response.status===404){
              this.carnetService.createAsesor(exampleCarnet).subscribe(response => {
                  console.log(response)
                  this.openSnackBar("Carnet creado", 'Cerrar');
                  this.downloadCarnet(exampleCarnet.cedule!);
                  this.router.navigate(['/carnet/list']);
              }, error => {
                 console.error('Error en la solicitud :create ', error);
                 this.openSnackBar(error.error.message, 'Cerrar');
                 return;
              });
       }
    }, error => {
      console.error('Error en la solicitud :', error);
      this.openSnackBar(error.error.message, 'Cerrar');
      return;
    }); */
    this.carnetService.createAsesor(exampleCarnet).subscribe(response => {
        console.log(response)
        this.openSnackBar("Carnet creado", 'Cerrar');
        this.downloadCarnet(exampleCarnet.cedule!);
        this.router.navigate(['/carnet/list']);
    }, error => {
       console.error('Error en la solicitud :create ', error);
       this.openSnackBar(error.error.message, 'Cerrar');
       return;
    });

  }
  
  onSubmit2() {
    if (!this.secondFormGroup.valid ) {
        this.openSnackBar("Algunos campos son requeridos", 'Cerrar');
        return;
    }

    //const { name,lastname,cedule,department,access_levels,card_code} = this.secondFormGroup.value;
    const { card_code} = this.secondFormGroup.value;

    const exampleCarnet: Carnet = {
        name: '',
        lastname:  '',
        cedule: card_code+'',
        type_creations: 1,
        status: 1,// activo = 1, Inactivo = 2  
        card_code: card_code?? '',
        charge: Number(31),//asesor 30,visitante 31
        department: Number(73),
        access_levels: Number(14),
        created_at: new Date(),
    }

    this.carnetService.createVisitante(exampleCarnet).subscribe(response => {
        console.log(response)
        this.openSnackBar("Carnet creado", 'Cerrar');
        this.downloadCarnet(exampleCarnet.cedule!);
        this.router.navigate(['/carnet/list']);
    }, error => {
       console.error('Error en la solicitud :create ', error);
       this.openSnackBar(error.error.message, 'Cerrar');
       return;
    });

    /*this.carnetService.checkCardCode(card_code!).subscribe(response => {
      // console.log(response.status)
       if(response.status===200){ // si responde 200 ya existe un carnet con ese codigo de barra
                                  // retornamos error para no crear carnet con un mismo numero
         this.openSnackBar("Ya existe un carnet con ese Codigo: "+card_code , 'Cerrar');   
        // this.router.navigate(['/carnet/list']);
         return;             
       }else if(response.status===404){
              this.carnetService.createAsesor(exampleCarnet).subscribe(response => {
                  console.log(response)
                  this.openSnackBar("Carnet creado", 'Cerrar');
                  this.downloadCarnet(exampleCarnet.cedule!);
                  this.router.navigate(['/carnet/list']);
              }, error => {
                 console.error('Error en la solicitud :create ', error);
                 this.openSnackBar(error.error.message, 'Cerrar');
                 return;
              });
       }
    }, error => {
      console.error('Error en la solicitud :', error);
      this.openSnackBar(error.error.message, 'Cerrar');
      return;
    }); */
  }

  remove(cedule:string){
    this.carnetService.delete(cedule).subscribe(response => {
       console.log(response)   
       this.openSnackBar(cedule + " ha sido eliminado", 'Cerrar');
       this.router.navigate(['/carnet/list']);
       return;
    },error => {
      console.error('Error en la solicitud :', error);
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

  
  
 
}
