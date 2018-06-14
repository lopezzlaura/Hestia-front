import {Component, EventEmitter, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {TypeModel} from "../../../../shared/models/TypeModel";
import {EmergencyModel} from "../../../../shared/models/EmergencyModel";
import {InhabitantModel} from "../../../../shared/models/InhabitantModel";
import {IssueModel} from "../../../../shared/models/IssueModel";
import {IssueService} from "../../../../shared/services/issue.service";
import {MaterializeAction} from "angular2-materialize";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {DialogOverviewComponent} from "../dialog-overview-issues/dialog-overview.component";
import {TypeService} from "../../../../shared/services/type.service";
import {HistoryService} from "../../../../shared/services/history.service";
import {AssignmentService} from "../../../../shared/services/assignment.service";
import {EmergencyService} from "../../../../shared/services/emergency.service";

@Component({
    selector: 'app-dialog-overview-iot',
    templateUrl: './dialog-overview-iot.component.html',
    styleUrls: ['./dialog-overview-iot.component.css']
})
export class DialogOverviewIotComponent implements OnInit {

    public needEdit: Promise<boolean>;
    public formLoaded: Promise<boolean>;
    public canEdit: Promise<boolean>;
    public editForm: FormGroup;
    authorId: number;
    types: TypeModel[];
    emergencies: EmergencyModel[];
    assignees: Array<string> = [];
    inhabitants: InhabitantModel[];
    inhabitantsNamesData;
    autocompleteInit;
    autocompleteInitChips;
    selectedType;
    selectedEmergency;
    currentIssue: IssueModel;

    chipsActions = new EventEmitter<string | MaterializeAction>();

    constructor(
        public dialogRef: MatDialogRef<DialogOverviewIotComponent>,
        @Inject(MAT_DIALOG_DATA)) {
    }

    ngOnInit() {
    }

    close() {
        this.dialogRef.close();
    }

}
