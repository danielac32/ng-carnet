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
//import {CardComponent} from '../../components/card/card.component'
import {MessageService} from '../../service/subjectService'
import { Subscription } from 'rxjs';

import {EstudianteService} from '../../service/estudiante.service'
import {CreateCurso,CreateAsignatura} from '../../interface/asignatura.interface'
import {MatTableModule} from '@angular/material/table';
import { MatTableDataSource } from '@angular/material/table';
import {Curso,Asignatura,ResponseCurso,Nota} from '../../interface/curso.interface'
import { MatTooltipModule } from '@angular/material/tooltip';
import {EditComponent} from './edit/edit.component'
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-notes',
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
      //CardComponent,
      MatTableModule,
      MatTooltipModule,
      EditComponent
  ],
  templateUrl: './notes.component.html',
  styleUrl: './notes.component.css'
})
export class NotesComponent implements OnInit {
/*
num:this.data.curso,
id_academico:this.data.id,
*/

displayedColumns: string[] = ['Asignatura', 'nota1', 'nota2', 'nota3'];
dataSource: Asignatura[] = [];



constructor(
    private router: Router,
    public dialogRef: MatDialogRef<NotesComponent>,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private messageService: MessageService,
     private estudianteService:EstudianteService
  ) {

}

ngOnInit(): void {
  if(this.data.read){
      this.viewNotes(this.data.curso,this.data.id);
  }else{
      this.editNotes(this.data.curso,this.data.id);
  }
}

viewNotes(curso:number,id_academico:number){
     this.estudianteService.getAsignaturas(curso,id_academico).subscribe(({materias})=> {
        //console.log(materias)
      this.dataSource=materias;
      },error => {
        console.error('Error en la solicitud:', error);
    });
}
editNotes(curso:number,id_academico:number){
     this.estudianteService.getAsignaturas(curso,id_academico).subscribe(({materias})=> {
        console.log(materias)
      },error => {
        console.error('Error en la solicitud:', error);
     });
}


save(id: string,curso:string,notas:Nota[]) {
     console.log(id,curso,notas)

}

save2(nota:Nota) {
     //console.log(nota)
     const dialogRef = this.dialog.open(EditComponent, {
            width: '350px',
            height:'250px',
            data: nota
        });
        dialogRef.afterClosed().subscribe(response => {
            if(response!==undefined){
                 
            }else{
              console.log("error: salio del formulario")
            }
        }, error => {
              
        });

this.dialogRef.close();

}


}