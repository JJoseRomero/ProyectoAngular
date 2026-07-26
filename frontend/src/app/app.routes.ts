import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Tabla } from  './tabla/tabla';


export const routes: Routes = [
       {
        path: '',
        component: Login
    },

    {
        path: 'tabla',
        component: Tabla
    }
];
