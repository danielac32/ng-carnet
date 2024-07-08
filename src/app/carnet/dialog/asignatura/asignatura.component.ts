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
import {Academico,AcademicoDetails} from '../../interface/estudiante.interface'
import {CardComponent} from '../../components/card/card.component'
import {MessageService} from '../../service/subjectService'
import { Subscription } from 'rxjs';
import {NewForm} from '../../formGroup/asignaturas.formGroup'
import {EstudianteService} from '../../service/estudiante.service'
import {CreateCurso,CreateAsignatura} from '../../interface/asignatura.interface'


@Component({
  selector: 'app-asignatura',
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
      CardComponent
  ],
  templateUrl: './asignatura.component.html',
  styleUrl: './asignatura.component.css'
})
export class AsignaturaComponent implements OnInit {
Materias: string[] = ['Fisica', 'Quimica', 'Matematica','Ingles','Castellano','Historia'];
newForm: FormGroup<NewForm>;
constructor(
    private router: Router,
    public dialogRef: MatDialogRef<AsignaturaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private messageService: MessageService,
    private estudianteService:EstudianteService

  ) {
this.newForm = new FormGroup<NewForm>(new NewForm());

}

ngOnInit(): void {
    //console.log(this.data.curso);
    //console.log(this.data.id); 
}
onSubmit() {
  if(!this.newForm.valid) return;

const{materias} = this.newForm.value;
//console.log(materias);
// Construir el array de asignaturas con notas en 0
if(materias){
    const asignaturas: CreateAsignatura[] = materias.map((materia: string) => {
      return {
        name: materia,
        notas: [{ valor: 0 },{ valor: 0 },{ valor: 0 }]
      };
    });

    const curso: CreateCurso = {
      num:this.data.curso,
      id_academico:this.data.id,
      asignaturas
    };

    //console.log(curso);
    this.estudianteService.createCurso(curso).subscribe((response) => {
       console.log(response,"ok")
        
    }, error => {
      console.error('Error en la solicitud :', error);
    });
}


this.dialogRef.close();
}
}
