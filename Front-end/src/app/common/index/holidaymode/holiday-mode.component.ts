import {Component, OnInit} from '@angular/core';
import {Http} from "@angular/http";
import {HolidayService} from "../../../../shared/services/holiday.service";

@Component({
    selector: 'app-holidaymode',
    templateUrl: './holiday-mode.component.html',
    styleUrls: ['./holiday-mode.component.css']
})
export class HolidayModeComponent implements OnInit {
    display: string;
    static actived: boolean = false;

    constructor(private hs: HolidayService) {
    }

    ngOnInit() {
        if (this.hs.getHolidayMode().subscribe(value => {return value.isActivated;})) {
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
