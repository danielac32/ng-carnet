import { Component,OnInit,inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms'; // Import FormsModule
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card'; // Import MatCardModule
import { MatCheckboxModule} from '@angular/material/checkbox';
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
        FourFormGroup} from '../../formGroup/UpdateCarnet.formGroup'

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
import {Carnet,CarnetResponseOne,carnet2} from '../../interface/carnet.interface'
 
import { Router,NavigationExtras,ActivatedRoute } from '@angular/router';
import { saveAs } from 'file-saver'; // Necesitarás instalar file-saver: npm install file-saver

import {MatAutocompleteModule} from '@angular/material/autocomplete';

import { Observable,of } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

import * as CryptoJS from 'crypto-js';


@Component({
  selector: 'app-update',
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
  templateUrl: './update.component.html',
  styleUrl: './update.component.css'
})
export class UpdateComponent implements OnInit {
//newForm: FormGroup<NewForm>;
firstFormGroup: FormGroup<FirstFormGroup>;
secondFormGroup: FormGroup<SecondFormGroup>;
thirdFormGroup: FormGroup<ThirdFormGroup>;
fourFormGroup: FormGroup<FourFormGroup>;
isLinear = false;
selectedFile?: File;

imageUrl: string | ArrayBuffer | null = null;
public department?: Department[] = []
public carnet?: carnet2;
//public texture?: Texture[] = []
public charge?: Charge[] = []
public access?: Access[] = []
//public genders?: Gender[]=[]
//public hair?: HairColor[]=[]
//public skin?: SkinColor[]=[]
public states?: State[]=[]
//public civil?: Civil[]=[]
public uniqueSuffix?:string;

		private _snackBar=inject(MatSnackBar);
		private carnetService=inject(CarnetService);
		private departmentService=inject(DepartmentService);
		private chargeService=inject(ChargeService);
		private accessService=inject(AccessService);
		private stateService=inject(StateService);
		private router=inject(Router);
    private route=inject(ActivatedRoute);

 constructor(/*private _snackBar: MatSnackBar,*/private http: HttpClient) {
    //this.newForm = new FormGroup<NewForm>(new NewForm());
    this.firstFormGroup = new FormGroup<FirstFormGroup>(new FirstFormGroup());
    this.secondFormGroup = new FormGroup<SecondFormGroup>(new SecondFormGroup());
    this.thirdFormGroup = new FormGroup<ThirdFormGroup>(new ThirdFormGroup());
    this.fourFormGroup = new FormGroup<FourFormGroup>(new FourFormGroup());
 }


    decryptString(encryptedValue: string, key: string): string {
      const bytes = CryptoJS.AES.decrypt(encryptedValue, key);
      return bytes.toString(CryptoJS.enc.Utf8);
    }


  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 5000, // Duración en milisegundos
      verticalPosition: 'top', // Posición vertical de la alerta
      horizontalPosition: 'end', // Posición horizontal de la alerta
      panelClass: ['green']
    });
  }

  RealCedule:string="null";

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


    formatDate(date: Date): string {
      const d = new Date(date);
      let month = '' + (d.getMonth() + 1);
      let day = '' + d.getDate();
      const year = d.getFullYear();

      if (month.length < 2) month = '0' + month;
      if (day.length < 2) day = '0' + day;

      return [year, month, day].join('-');
    }


		ngOnInit(): void {
      this.route.queryParams.subscribe(params => {
     
          const id = this.decryptString(params['id'],"12345");
          console.log(id)
          this.RealCedule=id;

          this.carnetService.get(id).subscribe(({carnet}) => {
            this.carnet=carnet
            console.log(carnet)
            this.firstFormGroup.get('name')?.setValue(carnet.name??"");
            this.firstFormGroup.get('lastname')?.setValue(carnet.lastname??"");
            this.firstFormGroup.get('expiration')?.setValue(this.formatDate(carnet.expiration));
            this.firstFormGroup.get('note')?.setValue(carnet.note??"");

            this.secondFormGroup.get('cedule')?.setValue(carnet.cedule??"");
            this.secondFormGroup.get('address')?.setValue(carnet.address??"");
            this.secondFormGroup.get('cellpone')?.setValue(carnet.cellpone??"");
            this.secondFormGroup.get('card_code')?.setValue(carnet.card_code??"");


            //this.thirdFormGroup.get('cedule')?.setValue(carnet.cedule??"");
            //this.thirdFormGroup.get('address')?.setValue(carnet.address??"");
           // this.thirdFormGroup.get('cellpone')?.setValue(carnet.cellpone??"");

           // this.fourFormGroup.get('state')?.setValue(carnet.state??"");
           // this.fourFormGroup.get('address')?.setValue(carnet.address??"");
           // this.fourFormGroup.get('cellpone')?.setValue(carnet.cellpone??"");

          }, error => {
            console.error('Error en la solicitud :', error);
            this.openSnackBar("Error cargando Carnet", 'Cerrar');
            this.router.navigate(['/carnet/buscar']);
          });
      },error=>{
        console.log(error)
      });
      this.departmentService.findAll().subscribe(({department}) => {
         //console.log(department,"ok")
         this.department=department;
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
    this.stateService.findAll().subscribe(({state}) => {
       //console.log(response,"ok")
       this.states=state;
       //console.log(this.department)
    }, error => {
      console.error('Error en la solicitud :', error);
    });


		}
    
		onSubmit() {
      if (!this.firstFormGroup.valid ||
          !this.secondFormGroup.valid || 
          !this.thirdFormGroup.valid || 
          !this.fourFormGroup.valid) {
          this.openSnackBar("Algunos campos son requeridos", 'Cerrar');
          return;
      }
      

      const {name,lastname,expiration,note} = this.firstFormGroup.value;
      const {cedule/*,extent*/,address,cellpone,card_code} = this.secondFormGroup.value;
      const {department,charge/*,textures*/,access_levels/*,genders,hair_colors*/} = this.thirdFormGroup.value;
      const {state/*,municipalities,parishes,skin_colors,civil_statuses*/}= this.fourFormGroup.value;
      let changePhoto:number =0;/// 100 es para usar la foto ya guardada
      
      /*this.carnetService.checkCardCode(card_code!).subscribe(response => {
        // console.log(response.status)
         if(response.status===200){ // si responde 200 ya existe un carnet con ese codigo de barra
                                    // retornamos error para no crear carnet con un mismo numero
           this.openSnackBar("Ya existe un carnet con ese Codigo: "+card_code , 'Cerrar');   
           return;             
         }
      }, error => {
        console.error('Error en la solicitud :', error);
        this.openSnackBar(error.error.message, 'Cerrar');
        return;
      }); */
      
      if(this.RealCedule !== cedule){
         this.openSnackBar("Para cambiar la cedula debe eliminar el carnet y crear de nuevo el registro", 'Cerrar');
         return;
      }

      if (this.selectedFile) {
          changePhoto=100;//si hay foto
      }else{
          changePhoto=200;
      }
      
 
      let dep : number = Number(department);
      let char : number = Number(charge);
      let acc : number = Number(access_levels);
      let sta : number = Number(state);
      if(dep===0)dep=this.carnet?.department?.id!;
      if(char===0)char=this.carnet?.charge?.id!;
      if(acc===0)acc=this.carnet?.access_levels?.id!;
      if(sta===0)sta=this.carnet?.state?.id!;


      const exampleCarnet: Carnet = {
        name: name?? '',
        lastname: lastname?? '',
        
        expiration: new Date(expiration ?? '' ),
        note: note?? '',

        cedule: cedule?? '',
        //extent: extent?? '',
        address: address?? '',
      // phone: '555-1234',
        cellpone: cellpone?? '',
        card_code: card_code?? '',
        //photo: this.uniqueSuffix as string,
        //qr: 'https://example.com/qr-code.jpg',
        
        department: Number(dep),
        charge: Number(char),
        type_creations: changePhoto,//uso este dato para decirle al nest usa la foto o la borra // ingreso = 1, Renovación = 2 , Extravío =  3
        //textures: Number(textures),
        status: 1,// activo = 1, Inactivo = 2  
        access_levels: Number(acc),
        //genders: Number(genders),
        //hair_colors: Number(hair_colors),
        state: Number(sta),
        //municipalities: municipalities?? '',
        //parishes: parishes?? '',
        //skin_colors: Number(skin_colors),
        //civil_statuses: Number(civil_statuses),
        created_at: new Date(),
        //updated_at: new Date('2023-06-27')
    }


     console.log(exampleCarnet)
     if (this.selectedFile) {// si hay un archivo 
         this.carnetService.update(this.RealCedule??"",exampleCarnet).subscribe(response => {
            
            this.openSnackBar("Creando carnet", 'Cerrar');
            if (this.selectedFile && cedule){
                console.log("enviar imagen")
                this.carnetService.sendFile(this.selectedFile ,cedule).subscribe(response => {
                   console.log(response)
                   this.openSnackBar("Carnet actualizado", 'Cerrar');
                   //this.downloadCarnet(cedule);
                   //window.location.reload();// 
                   this.router.navigate(['/carnet/buscar']);
                }, error => {
                   console.error('Error en la solicitud :sendFile ', error);
                   this.remove(cedule)
                   this.openSnackBar(error.error.message, 'Cerrar');
                   return;
                });
            }
         }, error => {
            console.error('Error en la solicitud :create ', error);
            this.openSnackBar(error.error.message, 'Cerrar');
            return;
        });
     }else{
         this.carnetService.update(this.RealCedule??"",exampleCarnet).subscribe(response => {
            console.log(response)
            this.openSnackBar("Carnet actualizado", 'Cerrar');
            this.router.navigate(['/carnet/buscar']);
         }, error => {
            console.error('Error en la solicitud :create ', error);
          this.openSnackBar(error.error.message, 'Cerrar');
          return;
        });
     }
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

}
