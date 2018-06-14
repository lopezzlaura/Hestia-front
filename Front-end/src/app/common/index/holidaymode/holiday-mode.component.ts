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
            this.temperature = value.temperature;
            this.alarm = value.areDectectorsOn;
        });
        if (this.temperature == undefined) {
            this.hs.setTemperature(1);
        }
        if (this.activated) {
            this.display = "Désactiver";
        } else {
            this.display = "Activer";
        }
        if (this.alarm) {
            this.displayAlarm = "Activée";
        } else {
            this.displayAlarm = "Désactivée";
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
        if (this.activated == true) {
            //TODO get temperature et appeler this.hs.setTemperature(this.temperature);
            this.hs.changeAlarmState(this.alarm);
        }
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
