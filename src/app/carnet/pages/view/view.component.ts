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
  selector: 'app-view',
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
  templateUrl: './view.component.html',
  styleUrl: './view.component.css'
})
export class ViewComponent implements OnInit {
    private _snackBar=inject(MatSnackBar);
    private carnetService=inject(CarnetService);
    private departmentService=inject(DepartmentService);
    private chargeService=inject(ChargeService);
    private accessService=inject(AccessService);
    private stateService=inject(StateService);
    private router=inject(Router);
    private route=inject(ActivatedRoute);
    
    frente: string | ArrayBuffer | null = null;
    atras: string | ArrayBuffer | null = null;


    RealCedule:string="null";
    public carnet?: carnet2;

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
   

  formatCedula(cedula: string) {
    if (!/^\d+$/.test(cedula)) {
      throw new Error("Input must be a valid number string.");
    }
    // Convertir el string a número entero
    let num = parseInt(cedula, 10);
    // Convertir el número a string con puntos como separadores de miles
    return "V-"+num.toLocaleString('de-DE');

  }


     
 encryptNumericString(text: string): string {
  const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';

  for (let i = 0; i < text.length; i++) {
    let char = text.charAt(i);
    let index = parseInt(char, 10);

    // Ensure we have a valid index
    if (!isNaN(index) && index >= 0 && index <= 9) {
      result += characters[index];
    } else {
      result += char; // Handle non-numeric characters
    }
  }

  return result;
}


 decryptNumericString(text: string): string {
  const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';

  for (let i = 0; i < text.length; i++) {
    let char = text.charAt(i);
    let index = characters.indexOf(char);

    // Ensure we have a valid character
    if (index >= 0 && index <= 9) {
      result += index.toString();
    } else {
      result += char; // Handle non-encrypted characters
    }
  }

  return result;
}


   ngOnInit(): void {



    /*const originalText = "20327658";
 

    const encryptedText = this.encryptNumericString(originalText);
    console.log(`Encrypted: ${encryptedText}`); // "Khoor, Zruog!"

    const decryptedText = this.decryptNumericString(encryptedText);
    console.log(`Decrypted: ${decryptedText}`); // "Hello, World!"*/




      this.route.queryParams.subscribe(params => {
      
          const id = this.decryptNumericString(params['id']);
         // console.log(id)
          //const id = params['id']
                 
          //const hash = decodeURIComponent(params['id']);
          //console.log(hash);
          //const id = this.decryptString(hash,"12345");
          //console.log(id)

          //const id = CryptoJS.MD5(params['id']).toString();
          
          this.RealCedule=id;
          this.carnetService.get2(id).subscribe(({carnet}) => {
          this.carnet=carnet
          this.showCarnet(this.carnet?.cedule??"");
          //console.log(carnet)
          }, error => {
            console.error('Error en la solicitud :', error);
            this.openSnackBar("Error cargando Carnet", 'Cerrar');
          });

      },error=>{
        console.log(error)
      });

   
   }

   showCarnet(cedule: string) {
    this.carnetService.getCarnetBlob(cedule).subscribe((blob) => {
      const reader = new FileReader();
      reader.onload = () => {
        this.frente = reader.result;
      };
      reader.readAsDataURL(blob);
      //
         this.carnetService.getCarnetBlob2(cedule).subscribe((blob) => {
            const reader = new FileReader();
            reader.onload = () => {
              this.atras = reader.result;
            };
            reader.readAsDataURL(blob);
          }, error => {
            console.error('File download error:', error);
            if(error.status===404)this.openSnackBar("Carnet no encontrado", 'Cerrar');
          });
      //
    }, error => {
      console.error('File download error:', error);
      if(error.status===404)this.openSnackBar("Carnet no encontrado", 'Cerrar');
    });
  }




}
