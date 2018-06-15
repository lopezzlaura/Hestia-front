import {Component, Input, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {DialogOverviewIotComponent} from "../dialog-overview-iot/dialog-overview-iot.component";
import {ConnectedObjectRequestModel} from "../../../../../shared/models/ConnectedObjectRequestModel";

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
                emergency: this.issueIot.emergency.name,
                area: this.issueIot.area.name,
                type: this.issueIot.actionType,
                date: this.issueIot.date,
                author: this.issueIot.author,
                time: this.issueIot.time,
                actionType: this.issueIot.actionType,
                connectedObject: this.issueIot.connectedObject.name
            }
        });
    }

}
