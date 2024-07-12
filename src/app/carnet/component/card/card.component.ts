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
import {carnet2} from "../../interface/carnet.interface"


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
      MatTabsModule
  ],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent implements OnInit {
   @Input() public carnet?: carnet2;
   private _snackBar=inject(MatSnackBar);
   private router=inject(Router);
   private carnetService=inject(CarnetService);

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
    console.log(this.carnet)
    this.showCarnet(this.carnet?.cedule??"");
 }

  showCarnet(cedule: string) {
    this.carnetService.getCarnetBlob(cedule).subscribe((blob) => {
      const reader = new FileReader();
      reader.onload = () => {
        this.frente = reader.result;
      };
      reader.readAsDataURL(blob);
    }, error => {
      console.error('File download error:', error);
      if(error.status===404)this.openSnackBar("Carnet no encontrado", 'Cerrar');
    });

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
  }
}
