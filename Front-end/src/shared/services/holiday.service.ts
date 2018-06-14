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
        return this.http.get<HolidayModel>(API_URL + 'holidays/0');
    }

    public changeHolidayState(state: boolean): void {
        let holiday = {
            id: 0,
            isActivated: state,
        };
        this.http.put<HolidayModel>(API_URL + 'holidays', holiday).subscribe(holiday => {
            console.log(holiday);
        });
    }

    public changeMinTemp(temp: number) {
        let holiday = {
            id: 0,
            temperature: temp,
        };
        this.http.put<HolidayModel>(API_URL + 'holidays', holiday).subscribe(holiday => {
            console.log(holiday);
        });
    }
}
