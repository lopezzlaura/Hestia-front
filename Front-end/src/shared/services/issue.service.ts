import {Injectable} from '@angular/core';
import {API_URL} from './rest/constants';
import {HttpClient} from '@angular/common/http';
import {RestService} from './rest/rest.service';
import {IssueModel} from "../models/IssueModel";
import {Observable} from "rxjs/Observable";
import {StateService} from "./state.service";
import {TypeService} from "./type.service";
import {InhabitantService} from "./inhabitant.service";
import {InhabitantModel} from "../models/InhabitantModel";
import {forkJoin} from "rxjs/observable/forkJoin";
import {EmergencyService} from "./emergency.service";

@Injectable()
export class IssueService {

    private issueList$: Observable<IssueModel[]>;

    constructor(private http: HttpClient, private rest: RestService, private state: StateService, private type: TypeService, private emergency: EmergencyService, private inhabitant: InhabitantService) {
    }

    public getIssues(): Observable<IssueModel[]> {
        this.issueList$ = this.http.get<IssueModel[]>(API_URL + "Issues");
        return this.http.get<IssueModel[]>(API_URL + 'Issues').map(models => models.map(model => {
            return new IssueModel(this.state, this.emergency, this.type, this.inhabitant, model.authorId, model.title, model.description, model.stateId, model.typeId, model.emergencyId, model.location, model.date, model.time, model.thirdPartyId, model.id);
        }));
    }

    public getIssue(id: number): Observable<IssueModel> {
        return this.http.get<IssueModel>(API_URL + 'Issues/' + id);
    }

    public getAssignIssues(memberId: number): Observable<IssueModel[]> {
        return this.http.get<IssueModel[]>(API_URL + "Members/" + memberId + "/assignedIssues").map(models => models.map(model => {
            return new IssueModel(this.state, this.emergency, this.type, this.inhabitant, model.authorId, model.title, model.description, model.stateId, model.typeId, model.emergencyId, model.location, model.date, model.time, null, model.id);
        }));
    }

    public createIssue(formData: FormData, idAuthor: number): Observable<IssueModel[]> {

        let issue = {
            title: formData.get('title').toString(),
            description: formData.get('description').toString(),
            emergencyId: parseInt(formData.get('idEmergency').toString()),
            typeId: parseInt(formData.get('idType').toString()),
            location: formData.get('location').toString(),
            date: formData.get('date').toString(),
            time: formData.get('time').toString(),
            authorId: idAuthor
        };
        return forkJoin(this.http.post<IssueModel>(API_URL + 'Issues', issue));
    }

    public updateState(id: number, state: number): void {
        this.issueList$.subscribe(array => array.forEach(value => {
            if (value.id == id) {
                console.log("old state : " + value.stateId);
                console.log("new state : " + state);
                let issue = {
                    title: value.title,
                    description: value.description,
                    location: value.location,
                    date: value.date,
                    time: value.time,
                    id: value.id,
                    authorId: value.authorId,
                    thirdPartyId: value.thirdPartyId,
                    typeId: value.typeId,
                    emergencyId: value.emergencyId,
                    stateId: state,
                };
                this.http.put<IssueModel>(API_URL + 'Issues/' + id, issue).subscribe(data => {
                    console.log(data);
                });
            }
        }));
    }

    public deleteIssue(issueId: number): Observable<IssueModel[]> {
        console.log("Deleting Issue id : " + issueId);
        return forkJoin(this.http.delete<IssueModel>(API_URL + "Issues/" + issueId));
    }

    public updateIssue(idIssue: number, state: number, idAuthor: number, formData: FormData): Observable<IssueModel[]> {
        let issue = {
            authorId: idAuthor,
            title: formData.get('title').toString(),
            description: formData.get('description').toString(),
            emergencyId: parseInt(formData.get('idEmergency').toString()),
            typeId: parseInt(formData.get('idType').toString()),
            location: formData.get('location').toString(),
            date: formData.get('date').toString(),
            time: formData.get('time').toString(),
            id: idIssue,
            stateId: state
        };
        console.log(issue.authorId);
        return forkJoin(this.http.put<IssueModel>(API_URL + 'Issues', issue));

    }
}
