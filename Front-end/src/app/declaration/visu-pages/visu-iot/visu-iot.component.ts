///<reference path="../../../../../node_modules/@angular/core/src/metadata/directives.d.ts"/>
import {Component, OnInit} from '@angular/core';
import {ManagerGuard} from "../../../guards/manager-guard";
import {Observable} from "rxjs/Observable";
import {InhabitantService} from "../../../../shared/services/inhabitant.service";
import {ConnectedObjectRequestModel} from "../../../../shared/models/ConnectedObjectRequestModel";
import {ConnectedObjectRequestService} from "../../../../shared/services/connected_object_request.service";
import {IssueModel} from "../../../../shared/models/IssueModel";
import {IssueService} from "../../../../shared/services/issue.service";

@Component({
    selector: 'app-visu-iot',
    templateUrl: './visu-iot.component.html',
    styleUrls: ['./visu-iot.component.css']
})
export class VisuIotComponent implements OnInit {
    public IOTissues: Observable<ConnectedObjectRequestModel[]>;
    public issues: Observable<IssueModel[]>;
    public idUser: number;

    constructor(private issueIOTService: ConnectedObjectRequestService, private managerGuard: ManagerGuard,
                private inhabitantService: InhabitantService, private issueService:IssueService) {
    }

    ngOnInit() {
        this.IOTissues = this.issueIOTService.getConnectedObjectRequests();
        this.issues = this.issueService.getIssues();
    }
}
