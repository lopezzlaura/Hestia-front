import {Injectable} from '@angular/core';
import {InhabitantService} from "./inhabitant.service";
import {StateService} from "./state.service";
import {TypeService} from "./type.service";
import {HttpClient} from "@angular/common/http";
import {API_URL} from "./rest/constants";
import {IssueModel} from "../models/IssueModel";
import {Observable} from "rxjs/Observable";
import {RestService} from "./rest/rest.service";
import {RankingModel} from "../models/RankingModel";
import {forkJoin} from "rxjs/observable/forkJoin";
import {forEach} from "@angular/router/src/utils/collection";

@Injectable()
export class RankingService {

    private rankingList$: Observable<RankingModel[]>;

    constructor(private http: HttpClient, private rest: RestService, private inhabitant: InhabitantService) {
    }

    public getRanking(): Observable<RankingModel[]> {
        this.rankingList$ = this.http.get<RankingModel[]>(API_URL + "Rankings");
        return this.http.get<RankingModel[]>(API_URL + 'Rankings').map(models => models.map(model => {
            let ranking = new RankingModel(this.inhabitant, model.points, model.id);
            return ranking;
        }));
    }

    public sortRaking(): Observable<RankingModel[]> {
        this.rankingList$ = this.http.get<RankingModel[]>(API_URL + "Rankings");
        let ranks = this.http.get<RankingModel[]>(API_URL + 'Rankings').map(models => models.map(model => {
            let ranking = new RankingModel(this.inhabitant, model.points, model.id);
            return ranking;
        }));
        let sortedRanks$ = ranks.map(items => items.sort(this.sort));
        console.log(sortedRanks$);
        return sortedRanks$;
    }

    private sort(a, b) {
        if (a.points < b.points)
            return -1;
        if (a.points > b.points)
            return 1;
        return 0;
    }


    /*public getRankingID(memberId: number): Observable<RankingModel> {
        return this.http.get<RankingModel>(API_URL + 'Rankings/' + memberId).map(model => {
            console.log(model);
            return new RankingModel(this.inhabitant, model.id, model.points);
        });
    }*/

    public putRanking(memberId: number, pointsGet: number): void {
        let ranking = new RankingModel(this.inhabitant, pointsGet, memberId);
        let exists = this.http.get<boolean>(API_URL + 'Rankings/' + memberId + '/exists').subscribe(value => {
            return value.valueOf();
        });
        if (exists) {
            forkJoin(this.http.get<RankingModel>(API_URL + 'Rankings/' + memberId)).subscribe(value => {
                ranking = new RankingModel(this.inhabitant, value[0].points + pointsGet, value[0].id);
                console.log(ranking);
                this.http.put<RankingModel>(API_URL + "Rankings/", ranking);
                console.log("put +10");
            });
        } else {
            console.log("put new");
            this.http.put<RankingModel>(API_URL + "Rankings/", ranking);
        }
    }
}
