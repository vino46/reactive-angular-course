import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'any',
})
export class MessagesService {
    private readonly messagesSubject = new BehaviorSubject<string[]>([]);
    public readonly messages$ = this.messagesSubject.asObservable();

    showMessages(...messages: string[]) {
        this.messagesSubject.next(messages);
    }
}
