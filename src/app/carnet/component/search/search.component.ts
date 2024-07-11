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
import { Router,NavigationExtras } from '@angular/router';
import {CeduleFormGroup} from '../../formGroup/getCedule.formGroup'
import {CarnetService} from '../../pages/services/carnet.service'

import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-search',
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
      MatIconModule
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit {
	ceduleFormGroup: FormGroup<CeduleFormGroup>;
 imageUrl: string | ArrayBuffer | null = null;

  private _snackBar=inject(MatSnackBar);
  private router=inject(Router);
  

 constructor(/*private _snackBar: MatSnackBar,*/private http: HttpClient) {
    this.ceduleFormGroup = new FormGroup<CeduleFormGroup>(new CeduleFormGroup());
 }

private carnetService=inject(CarnetService);



  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000, // Duración en milisegundos
      verticalPosition: 'top', // Posición vertical de la alerta
      horizontalPosition: 'end', // Posición horizontal de la alerta
      panelClass: ['green']
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
      if(error.status===404)this.openSnackBar("Carnet no encontrado", 'Cerrar');
    });
  }



 onSubmit() {
   if (!this.ceduleFormGroup.valid)return;
   const {cedule} = this.ceduleFormGroup.value;
   if (cedule) {
     this.showCarnet(cedule);
   } else {
     console.error('Cedule is null or undefined');
     this.openSnackBar("Cedula invalida", 'Cerrar');
   }
 }

 download(cedule:string){
     if(cedule){
        this.carnetService.downloadCarnet(cedule);
     }
 }

 ngOnInit(): void {

 }
}
