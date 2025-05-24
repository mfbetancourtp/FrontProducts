import { Component, OnInit, Pipe } from '@angular/core';
import { Product } from '../../models/Products';
import { ProductService } from '../../services/ProductService';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  displayedColumns = ['id', 'name', 'description', 'price', 'createdAt', 'actions'];
  loading = false;

  constructor(
    private svc: ProductService,
    private router: Router,
    private snack: MatSnackBar
  ) { }

  ngOnInit() { this.load(); }

  load(): void {
    this.loading = true;
    this.svc.list().subscribe({
      next: data => (this.products = data, this.loading = false),
      error: () => (this.loading = false)
    });
  }

  create(): void {
    this.router.navigate(['/products/new']);
  }

  edit(id: number): void {
    this.router.navigate(['/products', id]);
  }

  delete(id: number): void {
    if (!confirm('¿Eliminar este producto?')) return;
    this.svc.delete(id).subscribe({
      next: () => {
        this.snack.open('Producto eliminado', 'Cerrar', { duration: 2000 });
        this.load();
      }
    });
  }
}