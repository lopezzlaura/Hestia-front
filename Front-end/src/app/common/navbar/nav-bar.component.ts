import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../../shared/services/auth/auth.service';
import {forkJoin} from "rxjs/observable/forkJoin";
import {InhabitantService} from "../../../shared/services/inhabitant.service";
import {HistoryService} from "../../../shared/services/history.service";
import {md5} from "../../../shared/utils/md5";

@Component({
    selector: 'app-navbar',
    templateUrl: './nav-bar.component.html',
    styleUrls: ['./nav-bar.component.css'],
})

export class NavBarComponent implements OnInit {

    public notGuest: boolean;
    public currentMember: string;
    public news: number;
    public hash: string;

    constructor(private member: InhabitantService, private auth: AuthService, private historyService: HistoryService) {
    }

    ngOnInit() {
        const current = this.member.getCurrentMember();
        forkJoin(current).subscribe(([user]) => {
            user.realm == "guest" ? this.notGuest = false : this.notGuest = true;
            this.currentMember = user.firstname + " " + user.lastname;
            this.hash = md5(user.email);
        });
        const nbNews = this.historyService.getNumberOfHistories();
        forkJoin(nbNews).subscribe(([nb]) => {
            this.news = nb["count"];
        });
    }

    public disconnect() {
        this.auth.logout();
    }
}
