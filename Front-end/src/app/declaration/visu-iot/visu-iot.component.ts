///<reference path="../../../../node_modules/@angular/core/src/metadata/directives.d.ts"/>
import {Component, OnInit} from '@angular/core';
import {ManagerGuard} from "../../guards/manager-guard";
import {Observable} from "rxjs/Observable";
import {forkJoin} from "rxjs/observable/forkJoin";
import {InhabitantService} from "../../../shared/services/inhabitant.service";
import {ConnectedObjectRequestModel} from "../../../shared/models/ConnectedObjectRequestModel";
import {ConnectedObjectRequestService} from "../../../shared/services/connected_object_request.service";

@Component({
    selector: 'app-visu-iot',
    templateUrl: './visu-iot.component.html',
    styleUrls: ['./visu-iot.component.css']
})
export class VisuIotComponent implements OnInit {
    public issues: Observable<ConnectedObjectRequestModel[]>;
    public idUser: number;

    constructor(private issueService: ConnectedObjectRequestService, private managerGuard: ManagerGuard,
                private inhabitantService: InhabitantService) {

    }

    ngOnInit() {
        const currentMember = this.inhabitantService.getCurrentMember();
        forkJoin(currentMember).subscribe(([user]) => {
            this.idUser = user.id;
            console.log("id = " + this.idUser);
        });

        this.issues = this.issueService.getConnectedObjectRequests();

        this.issues.subscribe(array => array.forEach(value => {
            console.log(value);
        }));
    }
}
