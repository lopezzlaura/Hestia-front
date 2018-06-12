/**
 * Class that models an issue
 */
import {StateService} from '../services/state.service';
import {StateModel} from './StateModel';
import {forkJoin} from 'rxjs/observable/forkJoin';
import {TypeService} from '../services/type.service';
import {TypeModel} from './TypeModel';
import {InhabitantModel} from './InhabitantModel';
import {InhabitantService} from '../services/inhabitant.service';
import {EmergencyModel} from "./EmergencyModel";
import {EmergencyService} from "../services/emergency.service";

export class IssueModel {

    public id: number;
    public title: string;
    public description: string;
    public authorId: number;
    public stateId: number;
    public typeId: number;
    public emergencyId: number;
    public location: string;
    public date: string;
    public time: string;
    public thirdPartyId: number;
    public state: StateModel;
    public type: TypeModel;
    public emergency: EmergencyModel;
    public author: InhabitantModel;
    public thirdParty: InhabitantModel;
    public assignMember: InhabitantModel[];

    constructor(private stateService: StateService, private emergencyService: EmergencyService, private typeService: TypeService, private inhabitantService: InhabitantService, authorId: number, title?: string, description?: string, stateId?: number, typeId?: number, emergencyId?: number, location?: string, dates?:string, time?:string, thirdPartyId?: number, id?: number) {
        const stateRequest = stateService.getState(stateId);
        const typeRequest = typeService.getType(typeId);
        const inhabitantRequest = inhabitantService.getMember(authorId);
        const emergencyRequest = this.emergencyService.getEmergency(emergencyId);
        const assignRequest = this.inhabitantService.getAssignMembers(id);

        forkJoin([stateRequest, typeRequest, inhabitantRequest, emergencyRequest, assignRequest]).subscribe(results => {
            this.id = id;
            this.title = title;
            this.authorId = authorId;
            this.description = description;
            this.stateId = stateId;
            this.typeId = typeId;
            this.emergencyId = emergencyId;
            this.location = location;
            this.thirdPartyId = thirdPartyId;
            this.date = dates;
            this.time = time;
            this.state = results[0];
            this.type = results[1];
            this.author = results[2];
            this.emergency = results[3];
            this.assignMember = results[4]
        });

    }

    public getImg(): String {
        if (this.type != undefined) {
            return '/assets/images/icons/' + this.type.value + '.png';
        }
    }

}
