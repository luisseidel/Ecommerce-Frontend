import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ProductService, AlertService } from '@app/_services';
import { Product } from '@app/_models';

@Component({ templateUrl: 'list.component.html' })
export class ListComponent implements OnInit {
    products?: any[];

    constructor(
        private productService: ProductService, 
        private router: Router,
        private alertService: AlertService
    ) {}

    ngOnInit() {
        this.productService.getAll()
            .pipe(first())
            .subscribe(products => {
                this.products = products 
            });
    }

    deleteProduct(id: string) {
        this.alertService.clear();
        const product = this.products!.find(x => x.id === id);
        product.isDeleting = true;
        this.productService.delete(id)
            .pipe(first())
            .subscribe({
                next: () => {
                    this.productService.getAll().pipe(first()).subscribe(products => this.products = products);
                    this.alertService.success('Product Deleted', { keepAfterRouteChange: true });
                    this.router.navigateByUrl('/products');
                },
                error: error => {
                    this.alertService.error(error);
                    product.isDeleting = false;
                }
            })
    }
}