import { Routes } from '@angular/router';
//import { loggedGuard } from './core/guards/logged.guard';


import {guardCheckGuard} from './auth/services/guard-check.guard'
import { AuthGuard } from './auth/services/auth.guard';
import {ViewComponent} from './carnet/pages/view/view.component'

export const routes: Routes = [
    {
        path: 'ciip',
        loadChildren: () => import('./auth/auth.routes').then(m => m.AUTH_ROUTES)
    },
    {
        path: 'carnet', 
        loadChildren: () => import('./carnet/carnet.routes').then(m => m.CARNET_ROUTES),
        canActivate: [AuthGuard]
    },
    {
         path: 'carnet/ficha', component: ViewComponent 
    },

    /*{
        path: 'articles',
        loadChildren: () => import('./articles/articles.routes').then(m => m.ARTICLES_ROUTES)
    },
    {
        path: 'dashboard',
        loadChildren: () => import('./admin/admin.routes').then(m => m.ADMIN_ROUTES),
        canActivate: [AuthGuard]
    }*/
];