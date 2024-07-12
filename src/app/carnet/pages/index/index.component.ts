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

import {carnet2} from "../../interface/carnet.interface"

import {CardComponent} from "../../component/card/card.component"
@Component({
  selector: 'app-index',
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
      CardComponent
  ],
  templateUrl: './index.component.html',
  styleUrl: './index.component.css'
})
export class IndexComponent implements OnInit {
   private _snackBar=inject(MatSnackBar);
   private router=inject(Router);
   private carnetService=inject(CarnetService);
   
  
  public carnets: carnet2[] = [];

  public limit: number = 5;
  public limitOptions: number[] = [5, 10, 15, 25, 50];
  public page: number = 1;
  public total?:number;
  public metaPage?: number;
  public metaLastPage?: number;
  public status?:number=1;//Inactivo
  public rol?:string="All";

   openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000, // Duración en milisegundos
      verticalPosition: 'top', // Posición vertical de la alerta
      horizontalPosition: 'end', // Posición horizontal de la alerta
      panelClass: ['green']
    });
   }

 loadCarnets(){

 	this.carnetService.getCarnets(this.status, this.limit, this.page).subscribe(({total,lastPage,page,carnets}) => {
       //console.log(total,lastPage,page,carnets)
       this.carnets=carnets;
       console.log(this.carnets)
    }, error => {
       console.error('Error en la solicitud :', error);
    });
 	/* this.carnetService.getCarnets(this.status,this.rol, this.limit, this.page)
        .subscribe(({ reservations , meta }) => (
          this.reservations = reservations,
          this.metaLastPage = meta.lastPage,
          this.page = meta.page,
          this.total=meta.total
        ));*/
 }


 
  changeStatusFilter(newStatus: string): void {
    this.rol = newStatus;
    this.loadCarnets(); // Volver a cargar las reservas con el nuevo filtro
  }

  backReservations() {
    if(this.page <= 1) return;
    this.page--;
    this.loadCarnets()
  }
  
  otherReservations() {
    if(this.page === this.metaLastPage) return;
    this.page++
    this.loadCarnets();
  }

  changeLimit(event: any) {
    const value = event.target.value;
    this.limit = +value;
    this.loadCarnets();
    // this.limit = value;
  }


 ngOnInit(): void {
    this.loadCarnets();
 }
}
