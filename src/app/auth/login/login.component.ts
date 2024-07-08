import { Component ,OnInit} from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms'; // Import FormsModule
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card'; // Import MatCardModule

import { HttpClientModule } from '@angular/common/http';
import { Router ,NavigationExtras} from '@angular/router';


import { AuthService } from '../services/auth.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';

export class LoginForm {
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required,Validators.minLength(6)]);
}


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
      MatFormFieldModule,
      MatInputModule,
      MatButtonModule,
      FormsModule, // Import FormsModule
      ReactiveFormsModule, // Import ReactiveFormsModule
      CommonModule,
      MatCardModule,

  ],
  providers: [AuthService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})


export class LoginComponent implements OnInit {
  email?: string = '';
  password?: string = '';
  loginForm: FormGroup<LoginForm>;
public isLoggedIn: boolean = false;
   

   constructor(private _snackBar: MatSnackBar,
               private authService: AuthService,
               private router: Router) {
    this.loginForm = new FormGroup<LoginForm>(new LoginForm());
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
       localStorage.setItem('accessToken','....');
  }


  onSubmit(): void {
    if(this.loginForm.valid) {
         //const email = this.loginForm.get('email')!.value;
         //const password = this.loginForm.get('password')!.value;
         const {email,password}=this.loginForm.value;

         this.authService.login(email??'', password??'').subscribe(response => {
            if(response.user.isActive === false){
               this.openSnackBar("El usuario esta desactivado", 'Cerrar');
               return;
            }
            localStorage.setItem('accessToken', response.token);
            localStorage.setItem('userCurrent', JSON.stringify(response.user));
            console.log(response)
            this.router.navigate(['/carnet']);
         }, error => {
            this.openSnackBar(error.error.message, 'Cerrar');
            return;
         });
       }else return;
  }
}
