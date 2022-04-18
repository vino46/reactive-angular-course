import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, shareReplay, tap } from 'rxjs/operators';
import { User } from '../../model/user';
import { ApiService } from '../api/api.service';
import { LocalStorageService } from '../local-storage/local-storage.service';

@Injectable({
    providedIn: 'root',
})
export class AuthStore {
    private readonly localStorageUserKey = 'USER';
    private readonly userSubject = new BehaviorSubject<User | null>(this.localStorageService.getItem(this.localStorageUserKey) || null);

    public readonly user$ = this.userSubject.asObservable();
    public readonly isLoggedIn$ = this.user$.pipe(map((user) => !!user));

    constructor(
        private readonly apiService: ApiService,
        private readonly localStorageService: LocalStorageService,
    ) {}

    login(email: string, password: string): Observable<User> {
        return this.apiService.login(email, password)
            .pipe(
                map(ApiService.getResponsePayload),
                tap((data) => {
                    this.userSubject.next(data);
                    this.localStorageService.setItem(this.localStorageUserKey, data);
                }),
                shareReplay(),
            );
    }

    logout(): void {
        this.userSubject.next(null);
        this.localStorageService.removeItem(this.localStorageUserKey);
    }
}
