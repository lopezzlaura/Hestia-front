import {Injectable} from "@angular/core";
import {RestService} from "./rest/rest.service";
import {HttpClient} from "@angular/common/http";
import {API_URL} from "./rest/constants";
import {Observable} from "rxjs/Observable";
import {HolidayModel} from "../models/HolidayModel";

@Injectable()
export class HolidayService {

    constructor(private http: HttpClient, private rest: RestService) {
    }

    public getHolidayMode(): Observable<HolidayModel> {
        return this.http.get<HolidayModel>(API_URL + 'Holidays/1');
    }

    public changeHolidayState(state: boolean): void {
        let holiday = {
            id: 1,
            isActivated: state
        };
        this.http.patch<HolidayModel>(API_URL + 'Holidays', holiday).subscribe(holiday => {
            console.log(holiday);
        });
    }
}
