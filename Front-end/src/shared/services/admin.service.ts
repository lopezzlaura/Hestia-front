import {Injectable} from '@angular/core';
import {HTTP_METHOD} from './rest/constants';
import {HttpClient} from '@angular/common/http';
import {InhabitantModel} from '../models/InhabitantModel';
import {RestService} from './rest/rest.service';
import { ReplaySubject } from 'rxjs/ReplaySubject';


@Injectable()
export class AdminService {

  public inhabitantList$: ReplaySubject<InhabitantModel[]>;

  constructor(private http: HttpClient, private rest: RestService) {
    this.inhabitantList$ = new ReplaySubject(1);
    this.inhabitantList$.next([new InhabitantModel(1)]);
  }

  public getMembers() {
    this.rest.request(HTTP_METHOD.GET, 'Members')
      .then(res => this.extractAndUpdateInhabitantList(res)).catch(err => {
      console.log(err);
    });
    console.log('getting members');
  }

  // TODO NOT WORKING BRUH
  public getMemberCount(): number|any {
    this.rest.request(HTTP_METHOD.GET, 'Members/count').then(res => {
      const val =  JSON.stringify(res);
      const json = JSON.parse(val);
      const value = json.count;
      console.log(value);
      return value;
    });
  }

  // TODO manage errors
  public postMember(member: InhabitantModel): void {
    this.rest.request(HTTP_METHOD.POST, 'Members', member);
    console.log('posting new inhabitant');
  }

  /**
   * putMember
   */
  // TODO manage errors
  public patchMember(member: InhabitantModel): void {
    this.rest.request(HTTP_METHOD.PATCH, 'Members', member);
    console.log('patching inhabitant');
  }


  /**
   * deleteMember
   */
  public deleteMember(member: InhabitantModel): void {
    this.rest.request(HTTP_METHOD.DELETE, 'Members/' + member.id);
    console.log('deleting inhabitant');
  }

  private extractAndUpdateInhabitantList(res: Object) {
    const val = JSON.stringify(res);
    const json = JSON.parse(val);
    this.inhabitantList$.next(json);
  }

}
