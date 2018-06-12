import {HTTP_METHOD} from '../../../shared/services/rest/constants';
import {RestService} from '../../../shared/services/rest/rest.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Component, EventEmitter, OnInit} from '@angular/core';
import {AuthService} from '../../../shared/services/auth/auth.service';
import {MaterializeAction} from 'angular2-materialize';
import {matchOtherValidator} from '../validator/match-other-validator';
import {Router} from "@angular/router";

@Component({
    selector: 'app-homepage',
    templateUrl: './app-homepage.component.html',
    styleUrls: ['./app-homepage.component.css']
})

export class HomePageComponent implements OnInit {
    registerForm: FormGroup;
    loginForm: FormGroup;
    modalActions = new EventEmitter<string | MaterializeAction>();
    modalActions2 = new EventEmitter<string | MaterializeAction>();
    errorLog = false;
    alreadyExistEmail = false;

    constructor(private formBuilder: FormBuilder, private auth: AuthService, private rest: RestService, private router: Router) {
    }

    /**
     * Login method, if the form is valid, we can sign in
     */
    onLogin(): void {
        if (this.loginForm.valid) {
            this.auth.login(this.loginForm.value.email, this.loginForm.value.password)
                .then(res => {
                    this.closeConnexion();
                    this.router.navigate(['/home/welcome']);
                }).catch(err => {
                this.errorLog = true;
                console.log(err);
            });
        }
    }

    /**
     * Registration method, if the form is valid, we can register
     */
    onRegistration(): void {
        if (this.registerForm.valid) {
            this.auth.registration(this.registerForm.value.firstname, this.registerForm.value.lastname,
                this.registerForm.value.email, this.registerForm.value.password_reg)
                .then(res => {
                    console.log(res);
                }).catch(err => {
                this.alreadyExistEmail = err.error.error.details.messages.email[0] === 'Email already exists';
            });
        }
    }

    /**
     * Open modal login
     */
    private openConnexion(): void {
        this.modalActions.emit({action: 'modal', params: ['open']});
    }

    /**
     * close modal login
     */
    private closeConnexion(): void {
        this.modalActions.emit({action: 'modal', params: ['close']});
    }

    /**
     * Open modal registration
     */
    private openRegistration(): void {
        this.modalActions2.emit({action: 'modal', params: ['open']});
    }

    /**
     * close modal login if we are not already registred and open registration modal
     */
    private clickInscriptionFromConnexion(): void {
        this.modalActions.emit({action: 'modal', params: ['close']});
        this.modalActions2.emit({action: 'modal', params: ['open']});
    }


    /**
     * Get the input of the forms, with this we can use for exemple, *ngif(email.valid)
     */
    private get email_reg() {
        return this.registerForm.get('email');
    }

    private get firstname() {
        return this.registerForm.get('firstname');
    }

    private get lastname() {
        return this.registerForm.get('lastname');
    }

    private get password_reg() {
        return this.registerForm.get('password_reg');
    }

    private get confirmPassword_reg() {
        return this.registerForm.get('confirmPassword_reg');
    }

    private get email_log() {
        return this.loginForm.get('email');
    }

    private get password_log() {
        return this.loginForm.get('password');
    }

    /**
     * Initialize the two form for login and register
     */
    ngOnInit(): void {
        this.registerForm = this.formBuilder.group({
                firstname: [null, Validators.required],
                lastname: [null, Validators.required],
                email: [null, [Validators.required, Validators.email,
                    Validators.pattern(/^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$/)]],
                password_reg: [null, [Validators.required, Validators.minLength(8)]],
                confirmPassword_reg: [null,
                    [Validators.required, Validators.minLength(8),
                        matchOtherValidator('password_reg')]
                ]
            }
        );

        this.loginForm = this.formBuilder.group({
                email: [null, [Validators.required, Validators.email,
                    Validators.pattern(/^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$/)]],
                password: [null, [Validators.required, Validators.minLength(8)]]
            }
        );
    }
}
