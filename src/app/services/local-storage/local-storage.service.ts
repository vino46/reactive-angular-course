import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class LocalStorageService {
    getItem<T = unknown>(key: string): T {
        return JSON.parse(localStorage.getItem(key));
    }

    setItem(key: string, data: unknown) {
        localStorage.setItem(key, JSON.stringify(data));
    }

    removeItem(key: string) {
        localStorage.removeItem(key);
    }
}
