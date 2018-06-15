import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {IssueService} from "../../../../../shared/services/issue.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {TypeService} from "../../../../../shared/services/type.service";
import {HistoryService} from "../../../../../shared/services/history.service";
import {AssignmentService} from "../../../../../shared/services/assignment.service";
import {EmergencyService} from "../../../../../shared/services/emergency.service";
import {GuestGuard} from "../../../../guards/guest-guard";
import {InhabitantService} from "../../../../../shared/services/inhabitant.service";

@Component({
    selector: 'dialog-overview-example',
    templateUrl: './dialog-overview-iot.component.html',
    styleUrls: ['./dialog-overview-iot.component.css']
})
export class DialogOverviewIotComponent implements OnInit {

    constructor(
        public dialogRef: MatDialogRef<DialogOverviewIotComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any, private typeService: TypeService, private emergencyService: EmergencyService, private formBuilder: FormBuilder, private inhabitantService: InhabitantService,
        private issueService: IssueService, private historyService: HistoryService, private assignmentService: AssignmentService, private guestGuard: GuestGuard) {
    }

    ngOnInit() {

    }

    close() {
        this.dialogRef.close();
    }

}
