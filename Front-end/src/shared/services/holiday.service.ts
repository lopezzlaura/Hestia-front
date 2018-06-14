import {Injectable} from "@angular/core";
import {RestService} from "./rest/rest.service";
import {HttpClient} from "@angular/common/http";
import {API_URL} from "./rest/constants";
import {Observable} from "rxjs/Observable";
import {HolidayModel} from "../models/HolidayModel";
import {MqttService} from "angular2-mqtt";

@Injectable()
export class HolidayService {

    constructor(private http: HttpClient, private rest: RestService, private _mqttService: MqttService) {
    }

    public activateHolidayMode(formData: FormData) {
        this._mqttService.connect({
            hostname: "localhost",
            port: 8080
        });

        console.log(formData.get("valueBool"));
        console.log(formData.get("temperature"));
        /*this._mqttService.unsafePublish('/hestia/holiday', formData.get("valueBool") + ";" + formData.get("temperature"));*/
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

    public changeAlarmState(state: boolean): void {
        let holiday = {
            id: 1,
            areDectectorsOn: state
        };
        this.http.patch<HolidayModel>(API_URL + 'Holidays', holiday).subscribe();
    }

    public setTemperature(temp: number): void {
        let holiday = {
            id: 1,
            temperature: temp
        };
        this.http.patch<HolidayModel>(API_URL + 'Holidays', holiday).subscribe();
    }
}
