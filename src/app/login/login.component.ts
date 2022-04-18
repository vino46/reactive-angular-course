import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { AuthStore } from '../services/auth/auth.store.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
    form: FormGroup;

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private readonly authStore: AuthStore,
    ) {
        this.form = fb.group({
            email: ['test@angular-university.io', [Validators.required]],
            password: ['test', [Validators.required]],
        });
    }

    login() {
        const val = this.form.value;

        this.authStore.login(val.email, val.password)
            .subscribe(
                () => {
                    this.router.navigateByUrl('/courses');
                },
                () => alert('Login is failed!'),
            );
    }
}
