/**
 * Class that models an issue
 */

import {forkJoin} from 'rxjs/observable/forkJoin';
import {InhabitantModel} from './InhabitantModel';
import {InhabitantService} from '../services/inhabitant.service';

export class RankingModel {

    public memberId: number;
    public points: number;
    public id: number;

    constructor(private inhabitantService: InhabitantService, points: number, id?: number) {
        const inhabitantRequest = inhabitantService.getMember(id);
        forkJoin([inhabitantRequest]).subscribe(results => {
            this.id = id;
            this.points = points;
            this.memberId = results[0].id;
        });
    }
}
