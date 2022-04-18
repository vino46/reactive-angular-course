import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { concatMap, finalize, tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'any',
})
export class LoadingService {
    private readonly loadingSubject = new BehaviorSubject(false);
    public readonly loading$ = this.loadingSubject.asObservable();

    constructor() {
        console.log('Another LoadingService instance created!');
    }

    setLoading(nextState: boolean) {
        this.loadingSubject.next(nextState);
    }

    showLoaderUntilCompleted<T>(observable$: Observable<T>): Observable<T> {
        return of(null).pipe(
            tap(() => this.setLoading(true)),
            concatMap(() => observable$),
            finalize(() => this.setLoading(false)),
        );
    }
}
