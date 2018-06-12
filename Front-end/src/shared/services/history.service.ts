import {Injectable} from '@angular/core';
import {API_URL} from './rest/constants';
import {HttpClient} from '@angular/common/http';
import {RestService} from './rest/rest.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Observable} from 'rxjs/Observable';
import {HistoryModel} from "../models/HistoryModel";
import {InhabitantService} from "./inhabitant.service";
import {IssueService} from "./issue.service";


@Injectable()
export class HistoryService {

    private historyList$: Observable<HistoryModel[]>;


    constructor(private http: HttpClient, private rest: RestService, private inhabitant: InhabitantService, private issue:IssueService) {
    }

    public getHistories(): Observable<HistoryModel[]> {
        this.historyList$ =  this.http.get<HistoryModel[]>(API_URL + 'Histories');
        return this.http.get<HistoryModel[]>(API_URL + 'Histories').map(models => models.map(model => {
            let history = new HistoryModel(this.inhabitant, this.issue, model.origin, model.memberId, model.issueId, model.type, model.id);
            return history;
        }));
    }

    public getHistory(id: number): Observable<HistoryModel> {
        return this.http.get<HistoryModel>(API_URL + 'Histories/' + id);
    }

    public getNumberOfHistories(): Observable<number> {
        return this.http.get<number>(API_URL + 'Histories/count').map(model => {
            return model;
        });
    }

    public postHistory(origin: string, issueId: number): void {
        let idAuth = 0;
        this.inhabitant.getCurrentMember().subscribe(member => {
            idAuth = member.id;
            let history = {
                origin: origin,
                memberId: idAuth,
                issueId: issueId,
                type : this.setImgType(origin)
            };
            this.http.post(API_URL + 'Histories', history).subscribe(data => {

            });
        });
    }

    private setImgType(origin : string): number {
        switch (origin) {
            case " a été créé " :
                return 1;
            case " a été supprimé " :
                return 2;
            case " a été passé " :
                return 3;
            case " a été modifié " :
                return 4;
            case " a été validé " :
                return 5;
        }
        return 0;
    }
}
