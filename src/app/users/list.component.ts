import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AccountService, AlertService } from '@app/_services';

@Component({ templateUrl: 'list.component.html' })
export class ListComponent implements OnInit {
    users?: any[];

    constructor(
        private accountService: AccountService, 
        private router: Router,
        private alertService: AlertService
    ) {}

    ngOnInit() {
        this.accountService.getAll()
            .pipe(first())
            .subscribe(users => this.users = users);
    }

    deleteUser(id: string) {
        this.alertService.clear();
        const user = this.users!.find(x => x.id === id);
        user.isDeleting = true;
        this.accountService.delete(id)
            .pipe(first())
            .subscribe({
                next: () => {
                    this.accountService.getAll().pipe(first()).subscribe(users => this.users = users);
                    this.alertService.success('User Deleted', { keepAfterRouteChange: true });
                    this.router.navigateByUrl('/users');
                },
                error: error => {
                    this.alertService.error(error);
                    user.isDeleting = false;
                }
            })
    }
}