import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuthStore } from './services/auth/auth.store.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
    constructor(
        public readonly authStore: AuthStore,
    ) {}

    logout() {
        this.authStore.logout();
    }
}
