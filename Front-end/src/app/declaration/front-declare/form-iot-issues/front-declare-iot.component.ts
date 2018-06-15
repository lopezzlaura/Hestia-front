import {Component, OnInit} from "@angular/core";
import {EmergencyModel} from "../../../../shared/models/EmergencyModel";
import {EmergencyService} from "../../../../shared/services/emergency.service";
import {forkJoin} from "rxjs/observable/forkJoin";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AreaService} from "../../../../shared/services/area.service";
import {AreaModel} from "../../../../shared/models/AreaModel";
import {ConnectedObjectModel} from "../../../../shared/models/ConnectedObjectModel";
import {ConnectedObjectService} from "../../../../shared/services/connected_object.service";
import {ConnectedObjectRequestService} from "../../../../shared/services/connected_object_request.service";
import {DatePipe} from "@angular/common";

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

    constructor(private emergencyService: EmergencyService, private formBuilder: FormBuilder, private areaService: AreaService, private connectedObjectsService: ConnectedObjectService,
                private connectedObjectRequestService: ConnectedObjectRequestService,
                private datePipe: DatePipe) {
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
                this.valueOfArea = this.declareForm.get("areasCB").value;
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

        if (this.declareForm.valid) {
            console.log("c valid");
            this.connectedObjectRequestService.postConnectedObjectIssue(this.getIssue());
        }
        this.declareForm.reset();
    }

    private getIssue(): FormData {
        const formData = new FormData();

        formData.append("idEmergency", this.declareForm.get("emergencyCB").value);
        formData.append("title", this.declareForm.get("title").value);
        formData.append("description", this.declareForm.get("description").value);
        formData.append("actionType", this.declareForm.get("actionCB").value == "Allumer" ? "True" : "False");
        formData.append("zoneId", this.declareForm.get("areasCB").value);

        switch (this.declareForm.get("objectCB").value) {
            case 1:
                break;
            case 2:
                break;
            case 3:
                break;
            default :
                formData.append("object", this.declareForm.get("objectCB").value);
        }

        formData.append("date", this.declareForm.get("date").value == null ? this.datePipe.transform(new Date(), "dd-MM-yyyy").toString() : this.datePipe.transform(new Date(this.declareForm.get("date").value), "dd-MM-yyyy").toString());
        formData.append("time", this.declareForm.get("time").value != null ? this.declareForm.get("time").value.toString() : null);

        if (this.declareForm.get("date").value != null) {
            let date = new Date();
            let day = this.datePipe.transform(new Date(this.declareForm.get("date").value), "dd").toString();
            let month = this.datePipe.transform(new Date(this.declareForm.get("date").value), "MM").toString();
            let year = this.datePipe.transform(new Date(this.declareForm.get("date").value), "yyyy").toString();

            console.log(day);
            console.log(month);
            console.log(year);

            let hourTab = formData.get("time").toString().split(":");
            let hour = parseInt(hourTab[0]);
            let minute = parseInt(hourTab[1]);

            console.log(hour);
            console.log(minute);

            date.setFullYear(parseInt(year), parseInt(month), parseInt(day));
            date.setHours(hour, minute);

            console.log(date.getTime().toString());

            formData.append("date-milli", date.getTime().toString());
            return formData;
        }
    }
}
