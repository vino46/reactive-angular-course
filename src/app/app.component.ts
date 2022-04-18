import { Component, OnInit } from '@angular/core';
import { LoadingService } from './services/loading/loading.service';
import { MessagesService } from './services/messages/messages.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    providers: [
        LoadingService,
        MessagesService,
    ],
})
export class AppComponent implements OnInit {
    constructor() {

    }

    ngOnInit() {

    }

    logout() {

    }
}
