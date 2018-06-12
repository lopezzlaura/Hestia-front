/**
 * Class that models an state of an history
 */
import {IssueModel} from "./IssueModel";
import {InhabitantModel} from "./InhabitantModel";
import {forkJoin} from "rxjs/observable/forkJoin";
import {InhabitantService} from "../services/inhabitant.service";
import {IssueService} from "../services/issue.service";

export class HistoryModel {

    public id: string;
    public origin: string;
    public memberId: number;
    public issueId: number;
    public type: number;
    public member: InhabitantModel;
    public issue: IssueModel;

    constructor(private inhabitantService: InhabitantService, private issueService: IssueService, origin: string, memberId: number, issueId: number, type: number, id?: string) {

        const issueRequest = issueService.getIssue(issueId);
        const inhabitantRequest = inhabitantService.getMember(memberId);

        forkJoin([issueRequest, inhabitantRequest]).subscribe(results => {
            this.id = id;
            this.origin = origin;
            this.memberId = memberId;
            this.issueId = issueId;
            this.issue = results[0];
            this.member = results[1];
            this.type = type;
        });
    }

    public getImg(): String {
        if (this.type != undefined) {
            return '/assets/images/history_icons/' + this.type + '.png';
        }
    }
}
