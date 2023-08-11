import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { Product } from '@app/_models';

@Injectable({ providedIn: 'root' })
export class ProductService {

    constructor(
        private router: Router,
        private http: HttpClient
    ) {}

    create(product: Product) {
        return this.http.post(`${environment.apiUrl}/products`, product);
    }

    getAll() {
        return this.http.get<Product[]>(`${environment.apiUrl}/products`);
    }

    getById(id: string) {
        return this.http.get<Product>(`${environment.apiUrl}/products/${id}`);
    }

    update(id: string, product: Product) {
        return this.http.put(`${environment.apiUrl}/products/${id}`, product);
    }

    delete(id: string) {
        return this.http.delete(`${environment.apiUrl}/products/${id}`);
    }
}