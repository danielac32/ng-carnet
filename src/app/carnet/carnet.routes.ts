import { Routes } from "@angular/router";
//import {NuevoIngresoComponent} from './nuevo-ingreso/nuevo-ingreso.component'
//import {RegularComponent} from './regular/regular.component'
//import {LayoutComponent} from './layout/layout.component'
//import {UpdateComponent} from './update/update.component'
import {CrearComponent} from './pages/crear/crear.component'
import {BuscarComponent} from './pages/buscar/buscar.component'
import {LayoutComponent} from './layout/layout.component'

//import {guardCheckGuard} from './auth/service/guard-check.guard'
//import { AuthGuard } from './auth/service/' //'./auth/service/auth.guard';



export const CARNET_ROUTES: Routes = [
    {
        //path: '', component: LayoutComponent, children: [
        path: '', component: LayoutComponent, children: [
            { path: 'buscar', component: BuscarComponent },
            { path: 'crear', component: CrearComponent },
            //{ path: 'actualizar', component: UpdateComponent },
            //{ path: 'notas', component: NotasComponent },
            //{ path: '', redirectTo: 'nuevo-ingreso', pathMatch: 'full' }
        ]
    }
];

