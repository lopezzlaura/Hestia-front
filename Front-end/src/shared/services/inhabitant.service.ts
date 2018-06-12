import {Injectable} from "@angular/core";
import {API_URL} from "./rest/constants";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {InhabitantModel} from "../models/InhabitantModel";
import {IssueModel} from "../models/IssueModel";
import {StateService} from "./state.service";
import {TypeService} from "./type.service";
import {EmergencyService} from "./emergency.service";


@Injectable()
export class InhabitantService {

    public inhabitantsList$: Observable<InhabitantModel[]>;

    constructor(private http: HttpClient, private stateService: StateService, private typeService: TypeService, private emergencyService: EmergencyService) {
    }

    public getUser(id: number): Observable<InhabitantModel> {
        return this.http.get<InhabitantModel>(API_URL + "User/" + id);
    }

    public getMembers(): void {
        this.inhabitantsList$ = this.http.get<InhabitantModel[]>(API_URL + "Members");
    }

    public getMember(id: number): Observable<InhabitantModel> {
        return this.http.get<InhabitantModel>(API_URL + "Members/" + id);
    }

    public getCurrentMember(): Observable<InhabitantModel> {
        return this.http.get<InhabitantModel>(API_URL + "Members/getAuthenticated");
    }

    public getAssignMembers(issueId: number): Observable<InhabitantModel[]> {
        return this.http.get<InhabitantModel[]>(API_URL + 'Issues/' + issueId + "/thirdParties").map(model => model.map(model => {
            return new InhabitantModel(model.id, model.lastname, model.firstname, model.username, model.email, model.emailVerified, model.realm, model.password, model.city);
        }));
    }

    public deleteMember(id: number) {
        this.http.delete(API_URL + "Members/" + id).subscribe(() => this.getMembers());
    }

    /**
     * Modifies a member
     * @param member the member model modified
     */
    public patchMember(member: InhabitantModel) {
        if (member) {
            this.http.patch(API_URL + "Members", member).subscribe(() => this.getMembers());
        }

    }

    /**
     * Adds a member to the home
     * @param member the member to add to the home
     */
    public postMember(member: InhabitantModel) {
        if (member) {
            this.http.post(API_URL + "Members", member).subscribe(() => this.getMembers());
        }

    }
}
