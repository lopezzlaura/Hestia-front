import {Injectable} from "@angular/core";
import {RestService} from "./rest/rest.service";
import {HttpClient} from "@angular/common/http";
import {API_URL} from "./rest/constants";
import {IssueModel} from "../models/IssueModel";

@Injectable()
export class AssignmentService {

    constructor(private http: HttpClient, private rest: RestService) {
    }

    public addAssignment(memberId: number, issueId: number): void {
        let assignment = {
            thirdPartyId: memberId,
            issueId: issueId
        };
        this.http.post<IssueModel>(API_URL + 'Assignments', assignment).subscribe(assignment => {
            // console.log(assignment);
        });
    }
}
