import { Routes } from "@angular/router";
//import {NuevoIngresoComponent} from './nuevo-ingreso/nuevo-ingreso.component'
//import {RegularComponent} from './regular/regular.component'
//import {LayoutComponent} from './layout/layout.component'
//import {UpdateComponent} from './update/update.component'
import {CrearComponent} from './pages/crear/crear.component'
import {BuscarComponent} from './pages/buscar/buscar.component'
import {IndexComponent} from './pages/index/index.component'
import {LayoutComponent} from './layout/layout.component'
import {UpdateComponent} from './pages/update/update.component'

//import {guardCheckGuard} from './auth/service/guard-check.guard'
import { AuthGuard } from '../auth/services/auth.guard' //'./auth/service/auth.guard';

import {ViewComponent} from './pages/view/view.component'
import {GenerateComponent} from './pages/generate/generate.component'

export const CARNET_ROUTES: Routes = [
    {
        //path: '', component: LayoutComponent, children: [
        path: '', component: LayoutComponent, children: [
            { path: 'list', component: IndexComponent, canActivate: [AuthGuard]},
            { path: 'buscar', component: BuscarComponent, canActivate: [AuthGuard]},
            { path: 'crear', component: CrearComponent, canActivate: [AuthGuard] },
            { path: 'actualizar', component: UpdateComponent , canActivate: [AuthGuard]},
            { path: 'generar', component: GenerateComponent , canActivate: [AuthGuard]},
            //{ path: '', redirectTo: 'nuevo-ingreso', pathMatch: 'full' }
        ]
    }
];

