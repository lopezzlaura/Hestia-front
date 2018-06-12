import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {RankingModel} from "../../../../shared/models/RankingModel";
import {RankingService} from "../../../../shared/services/ranking.service";
import {forkJoin} from "rxjs/observable/forkJoin";
import {InhabitantService} from "../../../../shared/services/inhabitant.service";


@Component({
    selector: 'app-ranking',
    templateUrl: './ranking.component.html',
    styleUrls: ['./ranking.component.css']
})
export class RankingComponent implements OnInit {
    public ranks: Observable<RankingModel[]>;

    constructor(private rankingService: RankingService, private inhabitantService: InhabitantService) {
    }

    ngOnInit() {
        this.ranks = this.rankingService.sortRaking();
    }

    test(): void {
        this.ranks = this.rankingService.sortRaking();
    }

    getName(rank: RankingModel): string {
        console.log(rank);
        const member = this.inhabitantService.getMember(rank.memberId);
        let name;
        forkJoin(member).subscribe(([user]) => {
           name = user.firstname;
        });
        console.log(name);
        return name;
    }

}