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
import {Academico,AcademicoDetails} from '../../../interface/estudiante.interface'

import {MessageService} from '../../../service/subjectService'
import { Subscription } from 'rxjs';

import {EstudianteService} from '../../../service/estudiante.service'
import {CreateCurso,CreateAsignatura} from '../../../interface/asignatura.interface'
import {MatTableModule} from '@angular/material/table';
import { MatTableDataSource } from '@angular/material/table';
import {Curso,Asignatura,ResponseCurso,Nota,NotaUpdate} from '../../../interface/curso.interface'
import { MatTooltipModule } from '@angular/material/tooltip';
 
import {NewForm} from '../../../formGroup/edit-notas.formGroup'


@Component({
  selector: 'app-edit',
  standalone: true,
  providers: [EstudianteService],
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
      MatTableModule,
      MatTooltipModule,
  ],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditComponent implements OnInit {
  newForm: FormGroup<NewForm>;
constructor(
    private router: Router,
    public dialogRef: MatDialogRef<EditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private messageService: MessageService,
     private estudianteService:EstudianteService
  ) {
this.newForm = new FormGroup<NewForm>(new NewForm());

}
ngOnInit(): void {
  //console.log(this.data)
}

onSubmit() {
if(!this.newForm.valid) return;
const{nota} = this.newForm.value;
//console.log("->",nota);
//console.log(this.data.id,this.data.asignaturaId,typeof this.data.id,typeof this.data.asignaturaId)
//const id=this.data.nota?.id+'';

const notaUpdate: NotaUpdate = {
  valor: Number(nota),
  asignaturaId: Number(this.data.asignaturaId) // Asegúrate de que sea un número
};


//console.log(id,notaUpdate)
this.estudianteService.updateValor(String(this.data.id),notaUpdate).subscribe((response)=> {
  console.log(response)
},error => {
  console.error('Error en la solicitud:', error);
});


this.dialogRef.close();
}

}
