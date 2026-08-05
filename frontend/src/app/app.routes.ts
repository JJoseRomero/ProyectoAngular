import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Tabla } from './tabla/tabla';
import { NuevoUsuario } from './nuevo-usuario/nuevo-usuario';
import { Bitacora } from './bitacora/bitacora';

export const routes: Routes = [
    {
        path: '',
        component: Login
    },
    {
        path: 'tabla',
        component: Tabla
    },
    {
        path: 'nuevo-usuario',
        component: NuevoUsuario
    },
    {
        path: 'bitacora',
        component: Bitacora
    },
];