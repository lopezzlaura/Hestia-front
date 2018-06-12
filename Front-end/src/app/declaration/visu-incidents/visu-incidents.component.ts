import {Component, OnInit} from "@angular/core";
import {IssueService} from "../../../shared/services/issue.service";
import {InhabitantService} from "../../../shared/services/inhabitant.service";
import {IssueModel} from "../../../shared/models/IssueModel";
import {Observable} from "rxjs/Observable";
import {forkJoin} from "rxjs/observable/forkJoin";
import {DragulaService} from "ng2-dragula";
import {ManagerGuard} from "../../guards/manager-guard";
import {HistoryService} from "../../../shared/services/history.service";
import {StateService} from "../../../shared/services/state.service";
import {GuestGuard} from "../../guards/guest-guard";

@Component({
    selector: "app-visuIncidents",
    templateUrl: "./visu-incidents.component.html",
    styleUrls: ["./visu-incidents.component.css"],
})
export class VisuIncidentsComponent implements OnInit {
    public issues: Observable<IssueModel[]>;
    public idUser: number;
    private buttonValue: string;
    public isManager : Promise<boolean>;
    public canBeAssigned : Promise<boolean>;
    public isGuest : Promise<boolean>;
    public memberIssue: Observable<IssueModel[]>;

    constructor(private issueService: IssueService, private managerGuard: ManagerGuard,
                private inhabitantService: InhabitantService, private dragulaService: DragulaService,
                private historyService: HistoryService, private stateService: StateService,
                private guestGuard: GuestGuard) {
        dragulaService.drop.subscribe((value) => {
            this.onDrop(value.slice(1));
        });
    }

    ngOnInit() {
        this.buttonValue = 'assignes';
        const currentMember = this.inhabitantService.getCurrentMember();
        forkJoin(currentMember).subscribe(([user]) =>  {
            this.idUser = user.id;
            console.log("id = " + this.idUser);
        });
        forkJoin(currentMember).subscribe(([user]) => {
            this.idUser = user.id;
            if(user.realm != "child") {
                this.canBeAssigned = Promise.resolve(true);
            }
        });

        this.inhabitantService.getCurrentMember().subscribe(user => {
            this.memberIssue = this.issueService.getAssignIssues(user.id);
        });

        this.issues = this.issueService.getIssues();

        this.issues.subscribe(array => array.forEach(value => {
            console.log(value);
        }));

        this.isManager = this.managerGuard.canActivate();
        this.isGuest = this.guestGuard.canActivate();
    }

    public changeValue(newValue: string) {
        this.buttonValue = newValue;
    }

    public isSelected(value: string) {
        return this.buttonValue == value;
    }

    public onDrop(args: any) {
        const statesRequest = this.stateService.getStates();
        forkJoin(statesRequest).subscribe(value => {
            const stateMap = {};
            value[0].forEach(state => state.value == 0 ? stateMap["wip"] = state.id
                : state.value == -1 ? stateMap["not"] = state.id : stateMap["res"] = state.id);

            console.log(stateMap);

            let [e, el] = args;
            console.log(e);
            console.log(el);
            let newState = el.getAttribute("class").toString() == "drag-resolve" ? stateMap["res"] : el.getAttribute("class").toString() == "drag-wip" ? stateMap["wip"] : stateMap["not"];
            let newE = e.getElementsByTagName("app-issue")[0];
            let issueIdAttr = newE.getAttribute("id").toString();
            let issueId = parseInt(issueIdAttr.slice(issueIdAttr.indexOf("-"))[1]);
            this.issueService.updateState(issueId, newState);

        const state = this.stateService.getState(newState);
        forkJoin(state).subscribe(value => {
            this.historyService.postHistory(" a été passé " + value[0].name, issueId);
        });
        });
    }
}
