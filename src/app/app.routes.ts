import { GraficosModule } from './graficos/graficos.module';
import { Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

export const routes: Routes = [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    {
        path: 'list',
        loadChildren: () =>
          import('./inscripciones/inscripciones.module').then(
            (m) => m.InscripcionesModule
          ),
    },
    {
      path: 'dashboard',
      loadChildren: () =>
        import('./graficos/graficos.module').then(
          (m) => m.GraficosModule
        ),
  },
];
