import {Component, OnInit} from '@angular/core';
import {InhabitantModel} from "../../../shared/models/InhabitantModel";
import {InhabitantService} from "../../../shared/services/inhabitant.service";
import {forkJoin} from "rxjs/observable/forkJoin";
import {md5} from "../../../shared/utils/md5";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {matchOtherValidator} from "../validator/match-other-validator";
import {AuthService} from "../../../shared/services/auth/auth.service";
import {differentFromValidator} from "../validator/different_from_validator";
import {Router} from "@angular/router";

@Component({
    selector: 'app-profil',
    templateUrl: './profil.component.html',
    styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {

    changePassForm: FormGroup;
    cityForm: FormGroup;
    errorLog = false;
    member: InhabitantModel;
    private hash: string;
    formsLoaded: Promise<boolean>;
    errorThrown: Promise<boolean>;

    constructor(private inhabitantService: InhabitantService, private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {
    }

    ngOnInit() {

        const current = this.inhabitantService.getCurrentMember();
        forkJoin(current).subscribe(([user]) => {
            this.member = user;
            this.hash = md5(this.member.email);
            this.changePassForm = this.formBuilder.group({
                    actualPass: [null, [Validators.required, Validators.minLength(8)]],
                    newPass: [null, [Validators.required, Validators.minLength(8), differentFromValidator('actualPass')]],
                    confirmNewPass: [null, [Validators.required, Validators.minLength(8),
                        matchOtherValidator('newPass')]]
                }
            );
            this.cityForm = this.formBuilder.group({
                    newCity: [null, [Validators.required]],
                    pass: [null, [Validators.required] ]
                }
            );
            this.formsLoaded = Promise.resolve(true);
        });
    }

    public onPassChange(): void {
        if (this.changePassForm.valid) {
            this.authService.changePassword(this.changePassForm.value.actualPass, this.changePassForm.value.newPass)
                .then(res => {
                    this.changePassForm.reset();
                    this.errorThrown = Promise.resolve(false);
                    this.router.navigate(['/home/profil']);
                }).catch(err => {
                this.errorLog = true;
                this.errorThrown = Promise.resolve(true);
                console.log(err);
            });
        }
    }

    public onCitySet(): void {
        if (this.cityForm.valid) {
            this.authService.updateUserCity(this.member, this.cityForm.value.newCity, this.cityForm.value.pass)
                .then(res => {
                    console.log("city updated");
                    this.cityForm.reset();
                    this.router.navigate(['/home/profil']);
                }).catch(err => {
                this.errorLog = true;
                console.log(err);
            });
        }
    }

    get confirmNewPass() {
        return this.changePassForm.get('confirmNewPass');
    }


}
