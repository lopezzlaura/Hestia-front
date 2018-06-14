import {Component, OnInit} from '@angular/core';
import {Http} from "@angular/http";
import {HolidayService} from "../../../../shared/services/holiday.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ConnectedObjectRequestService} from "../../../../shared/services/connected_object_request.service";

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
    holidayForm: FormGroup;

    constructor(private hs: HolidayService, private formBuilder: FormBuilder) {
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

        this.holidayForm = this.formBuilder.group({
            temp: []
        });
    }

    onClick() {
        if (!this.activated) {
            this.display = "Désactiver";
            this.activated = true;
            console.log("Activé")
            this.hs.activateHolidayMode(this.createData("True", this.holidayForm.get("temp").value));
        } else {
            this.display = "Activer";
            this.activated = false;
            console.log("Désactivé");
            this.hs.activateHolidayMode(this.createData("False", this.holidayForm.get("temp").value));
        }

        this.hs.changeHolidayState(this.activated);
        if (this.activated == true) {
            this.hs.setTemperature(this.holidayForm.get("temp").value);
            this.hs.changeAlarmState(this.alarm);
        }
    }

    private createData(value: string, temp: number): FormData {
        const formData = new FormData();
        formData.append("valueBool", value);
        formData.append("temperature", temp.toString());
        return formData;
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
