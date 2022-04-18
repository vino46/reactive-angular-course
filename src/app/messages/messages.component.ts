import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Message } from '../model/message';
import { MessagesService } from '../services/messages/messages.service';

@Component({
    selector: 'app-messages',
    templateUrl: './messages.component.html',
    styleUrls: ['./messages.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessagesComponent {
    public readonly showMessages$ = this.messagesService.messages$.pipe(
        map((messages) => !!messages.length),
    );

    constructor(
        public readonly messagesService: MessagesService,
    ) {
        console.log('Messages Component created!');
    }

    handleClose() {
        this.messagesService.showMessages();
    }
}
