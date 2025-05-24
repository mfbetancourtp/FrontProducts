// src/app/services/product.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/Products';
import { environment } from '../../app/enviroments/environment';

@Injectable({ providedIn: 'root' })
export class ProductService {
    private base = `${environment.apiUrl}/products`;

    constructor(private http: HttpClient) { }

    list(): Observable<Product[]> {
        return this.http.get<Product[]>(this.base);
    }

    get(id: number): Observable<Product> {
        return this.http.get<Product>(`${this.base}/${id}`);
    }

    create(p: Product): Observable<Product> {
        return this.http.post<Product>(this.base, p);
    }

    update(id: number, p: Product): Observable<void> {
        return this.http.put<void>(`${this.base}/${id}`, p);
    }

    delete(id: number): Observable<void> {
        return this.http.delete<void>(`${this.base}/${id}`);
    }
}
