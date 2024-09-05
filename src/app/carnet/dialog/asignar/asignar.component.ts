import { Component, OnInit,Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
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
import {MatMenuModule} from '@angular/material/menu';
import { Router } from '@angular/router';
import {AddVisitorFormGroup} from '../../formGroup/newVisitante.formGroup'


import {Department} from '../../interface/department.interface'
import {AccessService} from '../../pages/services/access.service'
import {Access} from '../../interface/access.interface'
import {CarnetVisitante} from '../../interface/carnet.interface'
import {CarnetService} from '../../pages/services/carnet.service'
import {DepartmentService} from '../../pages/services/department.service'




@Component({
  selector: 'app-asignar',
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
      MatMenuModule,
  ],
  templateUrl: './asignar.component.html',
  styleUrl: './asignar.component.css'
})
export class AsignarComponent implements OnInit {


addVisitorFormGroup: FormGroup<AddVisitorFormGroup>;

public department?: Department[] = []
public access?: Access[] = []
selectedDepartment?: { id: number, name: string};


constructor(
    private router: Router,
    public dialogRef: MatDialogRef<AsignarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _snackBar: MatSnackBar,
    private carnetService: CarnetService,
    private departmentService: DepartmentService,
    private accessService: AccessService
  ) {
  this.addVisitorFormGroup = new FormGroup<AddVisitorFormGroup>(new AddVisitorFormGroup());
}
  

openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000, // Duración en milisegundos
      verticalPosition: 'top', // Posición vertical de la alerta
      horizontalPosition: 'end', // Posición horizontal de la alerta
      panelClass: ['green']
    });
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



onSubmit() {

    if (!this.addVisitorFormGroup.valid ) {
        this.openSnackBar("Algunos campos son requeridos", 'Cerrar');
        return;
    }
   const { name,lastname,cedule,department,access_levels} = this.addVisitorFormGroup.value;

   const exampleCarnet: CarnetVisitante = {
        name: name?? '',
        lastname: lastname?? '',
        cedule: cedule?? '',
        department: department?? '',
        access_levels: access_levels?? '',
    }

    this.dialogRef.close({
          exampleCarnet
    });

}



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




}
