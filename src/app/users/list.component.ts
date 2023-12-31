﻿import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AccountService, AlertService } from '@app/_services';
import { User } from '@app/_models';

@Component({ templateUrl: 'list.component.html' })
export class ListComponent implements OnInit {
    users?: any[];
    loggedUser?: User | null;
    user?: null;

    constructor(
        private accountService: AccountService, 
        private router: Router,
        private alertService: AlertService
    ) {
        this.accountService.userSubject.subscribe(x => this.loggedUser = x);
    }

    ngOnInit() {
        this.accountService.getAll()
            .pipe(first())
            .subscribe(users => {
                this.users = users
                var user = this.users?.find(x => x.id === this.loggedUser!.id);
                user.sameUser = (user != null); 
            });
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