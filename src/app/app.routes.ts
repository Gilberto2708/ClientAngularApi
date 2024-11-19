import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/list', pathMatch: 'full' }, // Redirige a /list por defecto
  {
    path: 'new',
    loadComponent: () =>
      import('./contact-form/contact-form.component'), // Formulario para nuevo contacto
  },
  {
    path: 'list',

    children: [
      {
        path: '',
        loadComponent: () =>
          import('./contact-list/contact-list.component'), // Lista de contactos
      },
      {
        path: ':id/edit',
        loadComponent: () =>
          import('./contact-form/contact-form.component'), // Edición de contacto
      },
    ],
  },
];
