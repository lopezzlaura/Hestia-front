import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Component, EventEmitter, Inject} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {forkJoin} from "rxjs/observable/forkJoin";
import {TypeModel} from "../../../../shared/models/TypeModel";
import {EmergencyService} from "../../../../shared/services/emergency.service";
import {TypeService} from "../../../../shared/services/type.service";
import {InhabitantService} from "../../../../shared/services/inhabitant.service";
import {InhabitantModel} from "../../../../shared/models/InhabitantModel";
import {MaterializeAction} from "angular2-materialize";
import {IssueService} from "../../../../shared/services/issue.service";
import {HistoryService} from "../../../../shared/services/history.service";
import {AssignmentService} from "../../../../shared/services/assignment.service";
import {IssueModel} from "../../../../shared/models/IssueModel";
import {GuestGuard} from "../../../guards/guest-guard";
import {EmergencyModel} from "../../../../shared/models/EmergencyModel";

@Component({
    selector: 'dialog-overview-example',
    templateUrl: 'dialog-overview.component.html',
    styleUrls: ['./dialog-overview.component.css']
})
export class DialogOverviewComponent {

    public needEdit: Promise<boolean>;
    public formLoaded: Promise<boolean>;
    public canEdit: Promise<boolean>;
    public editForm: FormGroup;
    authorId : number;
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
        public dialogRef: MatDialogRef<DialogOverviewComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any, private typeService: TypeService, private emergencyService: EmergencyService, private formBuilder: FormBuilder, private inhabitantService: InhabitantService,
        private issueService: IssueService, private historyService: HistoryService, private assignmentService: AssignmentService, private guestGuard: GuestGuard) {
    }

    ngOnInit() {
        const types = this.typeService.getTypes();
        const emergencies = this.emergencyService.getEmergencies();
        const issue = this.issueService.getIssue(this.data.id);

        if(!this.guestGuard.canActivate()) {
            this.canEdit = Promise.resolve(true);
        }

        forkJoin(issue, types, emergencies).subscribe(([issueValue, typeValues, emergencyValues]) => {
            this.types = typeValues;
            this.currentIssue = issueValue;
            this.emergencies = emergencyValues;
            this.selectedType = this.currentIssue.typeId;
            this.selectedEmergency = this.currentIssue.emergencyId;
            this.authorId = this.currentIssue.authorId;
            this.editForm = this.formBuilder.group({
                    typeCB: [],
                emergencyCB: [],
                    title: [this.currentIssue.title, Validators.required],
                    description: [this.currentIssue.description, Validators.required],
                    location: [this.currentIssue.location ? this.currentIssue.location : null],
                    date: [this.currentIssue.date ? this.currentIssue.date : null],
                    time: [this.currentIssue.time ? this.currentIssue.time : null]
                }
            );
            this.formLoaded = Promise.resolve(true);
        });

        this.inhabitantsNamesData = {};

        this.inhabitantService.getMembers();
        this.inhabitantService.inhabitantsList$.subscribe(value => {
            this.inhabitants = value;
            value.forEach(valueInhabitant => {
                this.inhabitantsNamesData[valueInhabitant.firstname] = null;
            });
        });

        this.autocompleteInit = {
            data: this.inhabitantsNamesData,
        };

        this.autocompleteInitChips = {
            autocompleteOptions: {
                data: this.inhabitantsNamesData,
                limit: Infinity,
                minLength: 1
            },
            placeholder: 'Personne désignée *',
            secondaryPlaceholder: 'Autre personne désignée',
        };
    }

    public onEdit(): void {
        console.log(this.assignees.toString());
        if (this.editForm.valid) {
            const thirdPartyArray = [];
            this.inhabitants.forEach(value => {
                this.assignees.forEach(name => {
                    if (value.firstname == name) thirdPartyArray.push(value.id);
                });
            });
            console.log("Third Parties : " + thirdPartyArray);
            console.log("Current issue id : " + this.currentIssue.id);
            this.issueService.updateIssue(this.currentIssue.id, this.currentIssue.stateId, this.authorId, this.getIssue()).subscribe(data => data.forEach(item => {
                const lastIssueIdCreated = item.id;
                console.log("Id of the new issue : " + item.id);
                this.historyService.postHistory(" a été modifié ", lastIssueIdCreated);
                thirdPartyArray.forEach(value => {
                    this.assignmentService.addAssignment(value, lastIssueIdCreated);
                });
            }));
        }
        this.editForm.reset();
    }

    private getIssue(): FormData {
        const formData = new FormData();
        formData.append("idType", this.editForm.get("typeCB").value == null ? this.selectedType.toString() : this.editForm.get("typeCB").value);
        formData.append("idEmergency", this.editForm.get("emergencyCB").value == null ? this.selectedEmergency.toString() : this.editForm.get("emergencyCB").value);
        formData.append("title", this.editForm.get("title").value);
        formData.append("description", this.editForm.get("description").value);
        formData.append("location", this.editForm.get("location").value == "" ? null : this.editForm.get("location").value);
        formData.append("date", this.editForm.get("date").value == null ? null : this.editForm.get("date").value);
        console.log(new Date(this.editForm.get("date").value).toDateString());
        formData.append("time", this.editForm.get("time").value != null ? this.editForm.get("time").value.toString() : null);
        formData.append("authorId", this.authorId.toString());
        console.log(parseInt(formData.get('authorId').toString()));
        console.log(this.editForm.get("title").value);
        console.log(parseInt(formData.get('idEmergency').toString()));
        console.log(this.editForm.get("emergencyCB").value);

        return formData;
    }

    setEmergencyValue() {
        this.selectedEmergency = this.editForm.get("emergencyCB").value;
    }


    setTypeValue() {
        this.selectedType = this.editForm.get("typeCB").value;
    }

    close() {
        this.dialogRef.close();
    }

    add(chip) {
        console.log("Chip added: " + chip.tag);
        this.assignees.push(chip.tag);
    }

    delete(chip) {
        console.log("Chip deleted: " + chip.tag);
        this.assignees = this.assignees.filter(value => value != chip.tag);
    }


    public edit(): void {
        this.needEdit = Promise.resolve(true);
    }

    public deleteIssue() : void {
        this.issueService.deleteIssue(this.data.id).subscribe(data => data.forEach(item => {
            const deletedIssue = item.id;
            console.log("Id of the new issue : " + item.id);
            this.historyService.postHistory(" a été supprimé ", deletedIssue);
        }));
        this.close();
    }
}

