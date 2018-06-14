import {Component, Input, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {IssueModel} from "../../../../shared/models/IssueModel";
import {DialogOverviewIotComponent} from "../dialog-overview-iot/dialog-overview-iot.component";
import {ConnectedObjectModel} from "../../../../shared/models/ConnectedObjectModel";
import {ConnectedObjectRequestModel} from "../../../../shared/models/ConnectedObjectRequestModel";

@Component({
    selector: 'app-issue-iot',
    templateUrl: './issue-iot.component.html',
    styleUrls: ['./issue-iot.component.css']
})
export class IssueIotComponent implements OnInit {

    @Input() issueIot: ConnectedObjectRequestModel;

    constructor(private dialog: MatDialog) {
    }

    ngOnInit() {
    }

    openDialog(): void {
        const dialogRef = this.dialog.open(DialogOverviewIotComponent, {
            width: '550px',
            data: {
                id: this.issueIot.id,
                title: this.issueIot.title,
                description: this.issueIot.description,
                emergency: this.issueIot.emergency.name,
                area: this.issueIot.area.name,
                type: this.issueIot.actionType,
                date: this.issueIot.date,
                time: this.issueIot.time,
                connectedObject: this.issueIot.connectedObject.name,
                author: this.issueIot.author.firstname + " " + this.issueIot.author.lastname,
            }
        });
    }

}
