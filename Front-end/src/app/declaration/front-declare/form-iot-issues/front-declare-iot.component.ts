import {Component, OnInit} from "@angular/core";
import {EmergencyModel} from "../../../../shared/models/EmergencyModel";
import {EmergencyService} from "../../../../shared/services/emergency.service";
import {forkJoin} from "rxjs/observable/forkJoin";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AreaService} from "../../../../shared/services/area.service";
import {AreaModel} from "../../../../shared/models/AreaModel";
import {ConnectedObjectModel} from "../../../../shared/models/ConnectedObjectModel";
import {ConnectedObjectService} from "../../../../shared/services/connected_object.service";

@Component({
    selector: "app-front-declare-iot",
    templateUrl: "./front-declare-iot.component.html",
    styleUrls: ["./front-declare-iot.component.css"]
})
export class FrontDeclareIotComponent implements OnInit {

    emergencies: EmergencyModel[];
    areas: AreaModel[];
    connectedObjects: ConnectedObjectModel[];
    valueOfArea: string;
    actionTypes: string[];
    declareForm: FormGroup;
    formLoaded: Promise<boolean>;
    dateInit;
    timeInit;

    constructor(private emergencyService: EmergencyService, private formBuilder: FormBuilder, private areaService: AreaService, private connectedObjectsService: ConnectedObjectService) {
    }

    ngOnInit() {
        const emergencies = this.emergencyService.getEmergencies();
        const areas = this.areaService.getAreas();
        const connectedObjects = this.connectedObjectsService.getConnectedObjects();

        forkJoin(emergencies, areas, connectedObjects).subscribe(([emergencyValues, areaValues, coObjectValues]) => {
                this.emergencies = emergencyValues;
                this.areas = areaValues;
                this.connectedObjects = coObjectValues;
                this.actionTypes = ["Allumer", "Eteindre"];
                this.declareForm = this.formBuilder.group({
                        emergencyCB: [Validators.required],
                        title: [null, Validators.required],
                        description: [null, Validators.required],
                        actionCB: [Validators.required],
                        areasCB: [Validators.required],
                        objectCB: [Validators.required],
                        date: [],
                        time: []
                    }
                );
                this.formLoaded = Promise.resolve(true);
                this.valueOfArea = this.declareForm.get("areaCB").value;
            }
        );

        this.dateInit = [{
            selectMonths: true,
            selectYears: 15,
            today: 'Today',
            clear: 'Clear',
            close: 'Ok',
            closeOnSelect: false,
            container: undefined,
        }];

        this.timeInit = [{
            default: 'now',
            fromnow: 0,
            twelvehour: false,
            donetext: 'OK',
            cleartext: 'Clear',
            canceltext: 'Cancel',
            container: undefined,
            autoclose: false,
            ampmclickable: true,
            aftershow: function () {
            }
        }];
    }

    public onDeclare(): void {
        console.log("YES REUSSI");
    }
}
