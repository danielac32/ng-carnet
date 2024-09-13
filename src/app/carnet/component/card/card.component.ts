import { Component, Input ,OnInit,inject} from '@angular/core';

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
import { Router,NavigationExtras } from '@angular/router';
import {CeduleFormGroup} from '../../formGroup/getCedule.formGroup'
import {CarnetService} from '../../pages/services/carnet.service'
import {MatTabsModule} from '@angular/material/tabs';

import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import {Carnet,carnet2,CarnetVisitante} from "../../interface/carnet.interface"
import * as CryptoJS from 'crypto-js';
import {AsignarComponent} from '../../dialog/asignar/asignar.component'
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-card',
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
      MatTooltipModule,
      MatIconModule,
      MatTabsModule,
      //AsignarComponent
  ],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent implements OnInit {
   @Input() public carnet?: carnet2;
   private _snackBar=inject(MatSnackBar);
   private router=inject(Router);
   public dialog=inject(MatDialog);

   private carnetService=inject(CarnetService);
   
dataVisitor?: string[]=[];

 frente: string | ArrayBuffer | null = null;
  atras: string | ArrayBuffer | null = null;

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000, // Duración en milisegundos
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
 ngOnInit(): void {
    //console.log(this.carnet)
    this.dataVisitor = this.carnet?.note?.split('#').filter(p => p.trim() !== '');
    this.showCarnet(this.carnet?.cedule??"");
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
            if(error.status===404)this.openSnackBar("Carnet no encontrado 2", 'Cerrar');
          });
      //
    }, error => {
      console.error('File download error:', error);
      if(error.status===404)this.openSnackBar("Carnet no encontrado 1", 'Cerrar');
    });
  }


  encryptString(value: string, key: string): string {
    return CryptoJS.AES.encrypt(value, key).toString();
  }

  decryptString(encryptedValue: string, key: string): string {
    const bytes = CryptoJS.AES.decrypt(encryptedValue, key);
    return bytes.toString(CryptoJS.enc.Utf8);
  }


  download(cedule:string){
     if(cedule){
        this.carnetService.downloadCarnet(cedule);
        this.carnetService.downloadCarnet2(cedule);
     }
 }


   update(cedule:string){
     if(cedule){
         const parametros: NavigationExtras = {
              queryParams: {
                id:this.encryptString(cedule,"12345")
              }
         };
         this.router.navigate(['/carnet/actualizar'],parametros);
     }
 }


asignar(cedule:string){
   if(cedule){
       const dialogRef = this.dialog.open(AsignarComponent, {
             
            data: {
              //record:this.globalDataFrame.response.recordAcademico
            }
        });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          // Result is an object with a property 'exampleCarnet'
          const carnetVisitante:CarnetVisitante = result.exampleCarnet;
          //console.log(carnetVisitante);

          let stringData:string=  carnetVisitante.name + "#" +
                                  carnetVisitante.lastname + "#" +
                                  carnetVisitante.cedule + "#" +
                                  carnetVisitante.department + "#" +
                                  carnetVisitante.access_levels;
          console.log(stringData);
          const exampleCarnet: Carnet = { 
              note: stringData?? '',    
          }
          this.carnetService.updateVisitante(cedule,exampleCarnet).subscribe(response => {
             console.log(response)   
             this.openSnackBar('Visitante asignado', 'Cerrar');

             this.router.navigate(['/carnet']);
             return;
          },error => {
            console.error('Error en la solicitud :', error);
            this.openSnackBar(error.error.message, 'Cerrar');
          });

        } else {
          console.log('El diálogo se cerró sin resultados');
          this.openSnackBar('El diálogo se cerró sin resultados', 'Cerrar');
        }
      }, error => {
        this.openSnackBar('Error recibiendo la respuesta del diálogo', 'Cerrar');
      });
   }
}

quitarVisitante(cedule:string){
   if(cedule){
        const exampleCarnet: Carnet = { 
            note:'',    
        }
        this.carnetService.updateVisitante(cedule,exampleCarnet).subscribe(response => {
           console.log(response)   
           this.openSnackBar('Visitante removido', 'Cerrar');
           this.router.navigate(['/carnet']);
           return;
        },error => {
          console.error('Error en la solicitud :', error);
          this.openSnackBar(error.error.message, 'Cerrar');
        });
   }
}





  deleteVisitante(cedule:string){
     if(cedule){
         this.carnetService.deleteVisitante(cedule).subscribe(response => {
           console.log(response)   
           this.openSnackBar(cedule + " ha sido eliminado", 'Cerrar');
           this.router.navigate(['/carnet']);
           return;
        },error => {
          console.error('Error en la solicitud :', error);
          this.openSnackBar(error.error.message, 'Cerrar');
        });
     }
  }
  
  delete(cedule:string){
     if(cedule){
         this.carnetService.delete(cedule).subscribe(response => {
           console.log(response)   
           this.openSnackBar(cedule + " ha sido eliminado", 'Cerrar');
           this.router.navigate(['/carnet']);
           return;
        },error => {
          console.error('Error en la solicitud :', error);
          this.openSnackBar(error.error.message, 'Cerrar');
        });
     }
  }


}
