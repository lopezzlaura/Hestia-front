import {Component, OnInit} from "@angular/core";
import {EmergencyModel} from "../../../../shared/models/EmergencyModel";
import {EmergencyService} from "../../../../shared/services/emergency.service";
import {forkJoin} from "rxjs/observable/forkJoin";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AreaModel} from "../../../../shared/models/AreaModel";
import {AreaService} from "../../../../shared/services/area.service";

@Component({
    selector: "app-front-declare-iot",
    templateUrl: "./front-declare-iot.component.html",
    styleUrls: ["./front-declare-iot.component.css"]
})
export class FrontDeclareIotComponent implements OnInit {

    emergencies: EmergencyModel[];
    areas: AreaModel[];
    actionTypes: string[];
    declareForm: FormGroup;
    formLoaded: Promise<boolean>;

    constructor(private emergencyService: EmergencyService, private formBuilder: FormBuilder, private areaService: AreaService) {
    }

    ngOnInit() {
        const emergencies = this.emergencyService.getEmergencies();
        const areas = this.areaService.getAreas();

        forkJoin(emergencies, areas).subscribe(([emergencyValues, areaValues]) => {
            this.emergencies = emergencyValues;
            this.areas = areaValues;
            this.actionTypes = ["Allumer", "Eteindre"];
            this.declareForm = this.formBuilder.group({
                    emergencyCB: [Validators.required],
                    title: [null, Validators.required],
                    description: [null, Validators.required],
                    areaCB: [],
                    identifierCB: [],
                    location: [null],
                    date: [null],
                    time: [null]
                }
            );
            this.formLoaded = Promise.resolve(true);
        });
    }
}
