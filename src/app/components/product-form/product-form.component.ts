import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule }
  from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule }
  from '@angular/material/snack-bar';
import { MatProgressSpinnerModule }
  from '@angular/material/progress-spinner';
import { ProductService } from '../../services/ProductService';
import { Product } from '../../models/Products';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  form!: FormGroup;
  id?: number;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private svc: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    private snack: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      price: [0, [Validators.required, Validators.min(0.01)]]
    });

    this.route.params.subscribe(p => {
      if (p['id']) {
        this.id = +p['id'];
        this.loading = true;
        this.svc.get(this.id).subscribe(prod => {
          this.form.patchValue(prod);
          this.loading = false;
        });
      }
    });
  }

  save(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.loading = true;
    const payload: Product = this.form.value;

    if (this.id) {
      // ––––– Modo edición (Observable<void>)
      this.svc.update(this.id, { id: this.id, ...payload })
        .subscribe({
          next: () => this.router.navigate(['/products']),
          error: () => this.loading = false
        });
    } else {
      // ––––– Modo creación (Observable<Product>)
      this.svc.create(payload)
        .subscribe({
          next: () => this.router.navigate(['/products']),
          error: () => this.loading = false
        });
    }
  }

  cancel(): void {
    this.router.navigate(['/products']);
  }
}
