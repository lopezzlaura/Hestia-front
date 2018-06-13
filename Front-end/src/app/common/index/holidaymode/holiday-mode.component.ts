import {Component, OnInit} from '@angular/core';
import {Http} from "@angular/http";

@Component({
    selector: 'app-holidaymode',
    templateUrl: './holiday-mode.component.html',
    styleUrls: ['./holiday-mode.component.css']
})
export class HolidayModeComponent implements OnInit {
    display: string;
    static actived: boolean = false;

    constructor(private http: Http) {
    }

    ngOnInit() {
        if (!HolidayModeComponent.actived) {
            this.display = "Désactiver";
        } else {
            this.display = "Activer";
        }
    }

    onClick() {
        if (!HolidayModeComponent.actived) {
            HolidayModeComponent.actived = true;
            this.display = "Désactiver";
            console.log("Activé")
        } else {
            HolidayModeComponent.actived = false;
            this.display = "Activer";
            console.log("Désactivé");
        }
    }

}
