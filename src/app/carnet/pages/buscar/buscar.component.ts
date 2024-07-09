import { Component, OnInit,inject } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import {SearchComponent} from '../../component/search/search.component'


@Component({
  selector: 'app-buscar',
  standalone: true,
  imports: [
  HttpClientModule,
  RouterLink,
  RouterOutlet,
  CommonModule,
  RouterModule,
  SearchComponent
  ],
  templateUrl: './buscar.component.html',
  styleUrl: './buscar.component.css'
})
export class BuscarComponent implements OnInit {
private route=inject(ActivatedRoute);
private router=inject(Router);


ngOnInit(): void {

}

}
