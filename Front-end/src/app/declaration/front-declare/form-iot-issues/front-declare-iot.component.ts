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
    areasString: string[];
    valueOfArea: string;
    areasSpe: string[];
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
                this.areasString = ["Chambre", "Salon", "Cuisine", "Toilettes", "Salle de bain", "Entrée", "Couloir", "Tous"];
                this.areasSpe = areaValues.map(areas => areas.name);
                this.actionTypes = ["Allumer", "Eteindre"];
                this.declareForm = this.formBuilder.group({
                        emergencyCB: [Validators.required],
                        title: [null, Validators.required],
                        description: [null, Validators.required],
                        areaCB: [this.areasString, Validators.required],
                        identifierCB: [this.areasSpe, Validators.required],
                        location: [null],
                        date: [null],
                        time: [null]
                    }
                );
                this.formLoaded = Promise.resolve(true);
                this.valueOfArea = this.declareForm.get("areaCB").value;
            }
        );

    }

    public getAreasFor(areaType: string) {
        const areasOfType = this.areaService.getAreas();
        this.areasSpe = [];

        forkJoin(areasOfType).subscribe((area1) => {
            area1.forEach(area2 => area2.forEach(area => {
                if (area.type == areaType) {
                    this.areasSpe.push(area.name);
                }
            }));
        })
    }
}
