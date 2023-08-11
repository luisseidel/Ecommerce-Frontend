import { Component } from '@angular/core';
import { AccountService } from '@app/_services';
import { User } from '@app/_models';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent {
    loggedUser?: User | null;

    constructor(private accountService: AccountService) {
        this.accountService.userSubject.subscribe(x => this.loggedUser = x);
    }
}