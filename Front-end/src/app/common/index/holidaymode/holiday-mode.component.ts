import {Component, OnInit} from '@angular/core';
import {Http} from "@angular/http";
import {HolidayService} from "../../../../shared/services/holiday.service";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
    selector: 'app-holidaymode',
    templateUrl: './holiday-mode.component.html',
    styleUrls: ['./holiday-mode.component.css']
})
export class HolidayModeComponent implements OnInit {
    display: string;
    displayAlarm: string;
    activated: boolean;
    temperature: number;
    alarm: boolean;

    constructor(private hs: HolidayService) {
    }

    ngOnInit() {
        this.hs.getHolidayMode().subscribe(value => {
            this.activated = value.isActivated;
        });
        if (this.activated) {
            this.display = "Désactiver";
        } else {
            this.display = "Activer";
        }
    }

    onClick() {
        if (!this.activated) {
            this.display = "Désactiver";
            this.activated = true;
            console.log("Activé")
        } else {
            this.display = "Activer";
            this.activated = false;
            console.log("Désactivé");
        }
        this.hs.changeHolidayState(this.activated);
    }

    changeAlarm() {
        if (this.alarm) {
            this.alarm = false;
            this.displayAlarm = "Désactivée"
        } else {
            this.alarm = true;
            this.displayAlarm = "Activée"
        }
    }
}
