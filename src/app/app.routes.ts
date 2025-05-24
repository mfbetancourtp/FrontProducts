// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductFormComponent } from './components/product-form/product-form.component';

export const ROUTES: Routes = [
    { path: '', redirectTo: 'products', pathMatch: 'full' },
    { path: 'products', component: ProductListComponent },
    { path: 'products/new', component: ProductFormComponent },
    { path: 'products/:id', component: ProductFormComponent },
];
