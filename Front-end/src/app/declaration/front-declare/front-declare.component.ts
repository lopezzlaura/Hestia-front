//<reference path="../../../../node_modules/@angular/core/src/metadata/directives.d.ts"/>
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Component, EventEmitter, OnInit} from "@angular/core";
import {TypeModel} from "../../../shared/models/TypeModel";
import {TypeService} from "../../../shared/services/type.service";
import {EmergencyService} from "../../../shared/services/emergency.service";
import {EmergencyModel} from "../../../shared/models/EmergencyModel";
import {IssueService} from "../../../shared/services/issue.service";

import {forkJoin} from "rxjs/observable/forkJoin";
import {InhabitantService} from "../../../shared/services/inhabitant.service";
import {InhabitantModel} from "../../../shared/models/InhabitantModel";
import {MaterializeAction} from "angular2-materialize";
import {DialogInhabitantComponent} from "./dialog-inhabitant.component";
import {MatDialog} from "@angular/material/dialog";
import {HistoryService} from "../../../shared/services/history.service";
import {AssignmentService} from "../../../shared/services/assignment.service";
import {DatePipe} from "@angular/common";

@Component({
    selector: "app-front-declare",
    templateUrl: "./front-declare.component.html",
    styleUrls: ["./front-declare.component.css"]
})
export class FrontDeclareComponent implements OnInit {
    types: TypeModel[];
    declareForm: FormGroup;
    emergencies: EmergencyModel[];
    inhabitants: InhabitantModel[];
    assignees: Array<string> = [];
    currentMemberId: number;
    inhabitantsNamesData;
    autocompleteInit;
    autocompleteInitChips;
    dateInit;
    timeInit;

    formLoaded: Promise<boolean>;

    chipsActions = new EventEmitter<string | MaterializeAction>();


    constructor(private typeService: TypeService, private emergencyService: EmergencyService, private formBuilder: FormBuilder,
                private issueService: IssueService, private inhabitantService: InhabitantService, private dialog: MatDialog,
                private historyService: HistoryService, private datePipe : DatePipe, private assignmentService: AssignmentService) {
    }

    add(chip) {
        console.log("Chip added: " + chip.tag);
        this.assignees.push(chip.tag);
    }

    delete(chip) {
        console.log("Chip deleted: " + chip.tag);
        this.assignees = this.assignees.filter(value => value != chip.tag);
    }

    select(chip) {
        console.log("Chip selected: " + chip.tag);
        this.inhabitantService.inhabitantsList$.subscribe(array => array.forEach(value => {
            if (value.firstname == chip.tag) {
                this.openDialog(value);
            }
        }));
    }

    openDialog(inhabitant: InhabitantModel): void {
        const dialogRef = this.dialog.open(DialogInhabitantComponent, {
            width: '550px',
            data: {
                firstname: inhabitant.firstname,
                lastname: inhabitant.lastname
            }
        });
    }

    ngOnInit() {
        const types = this.typeService.getTypes();
        const emergencies = this.emergencyService.getEmergencies();
        const currentMember = this.inhabitantService.getCurrentMember();

        forkJoin(types, emergencies, currentMember).subscribe(([typeValues, emergencyValues, currentMemberValue]) => {
            this.types = typeValues;
            this.emergencies = emergencyValues;
            this.currentMemberId = currentMemberValue.id;
            this.declareForm = this.formBuilder.group({
                    typeCB: [Validators.required],
                    emergencyCB: [Validators.required],
                    title: [null, Validators.required],
                    description: [null, Validators.required],
                    location: [null],
                    date: [null],
                    time: [null]
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
        console.log(this.assignees.toString());
        if (this.declareForm.valid) {
            const thirdPartyArray = [];
            this.inhabitants.forEach(value => {
                this.assignees.forEach(name => {
                    if (value.firstname == name) thirdPartyArray.push(value.id);
                });
            });
            this.issueService.createIssue(this.getIssue(), this.currentMemberId).subscribe(data => data.forEach(item => {
                const lastIssueIdCreated = item.id;
                console.log("Id of the new issue : " + item.id);
                this.historyService.postHistory(" a été créé ", lastIssueIdCreated);
                thirdPartyArray.forEach(value => {
                    this.assignmentService.addAssignment(value, lastIssueIdCreated);
                });
            }));
        }
        this.declareForm.reset();
    }

    private getIssue(): FormData {
        const formData = new FormData();
        formData.append("idType", this.declareForm.get("typeCB").value);
        console.log("Id type : " + this.declareForm.get("typeCB").value);
        formData.append("idEmergency", this.declareForm.get("emergencyCB").value);
        console.log("Id emergency : " + this.declareForm.get("emergencyCB").value);
        formData.append("title", this.declareForm.get("title").value);
        formData.append("description", this.declareForm.get("description").value);
        formData.append("location", this.declareForm.get("location").value == "" ? null : this.declareForm.get("location").value);
        console.log(new Date(this.declareForm.get("date").value).toDateString());
        formData.append("date", this.declareForm.get("date").value == null ?  this.datePipe.transform(new Date(), "dd-MM-yyyy").toString() : this.datePipe.transform(new Date(this.declareForm.get("date").value), "dd-MM-yyyy").toString());
        formData.append("time", this.declareForm.get("time").value != null ? this.declareForm.get("time").value.toString() : null);
        return formData;
    }
}
