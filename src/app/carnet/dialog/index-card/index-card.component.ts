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

@Component({
  selector: 'app-index-card',
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
      CardComponent
  ],
  templateUrl: './index-card.component.html',
  styleUrl: './index-card.component.css'
})
export class IndexCardComponent implements OnInit {

private subscription: Subscription;
constructor(
    private router: Router,
    public dialogRef: MatDialogRef<IndexCardComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private messageService: MessageService
  ) {


  this.subscription = this.messageService.message$.subscribe(message => {
        if(message.receiver==='index-card'){
           this.dialogRef.close({
                error:false,
                status:message.status,
                data:message.data
           });
        }
    });
}
records:AcademicoDetails[]=[];


ngOnInit(): void {
      this.records = this.data.record;
      console.log(this.records);
}
}


/*
*/