import {Component, OnInit} from '@angular/core';
import {Http} from "@angular/http";
import {API_WEATHER_URL, APP_ID} from '../../../../shared/services/rest/constants';
import {InhabitantService} from "../../../../shared/services/inhabitant.service";
import {forkJoin} from "rxjs/observable/forkJoin";

@Component({
    selector: 'app-weather',
    templateUrl: './app-weather.component.html',
    styleUrls: ['./app-weather.component.css']
})

export class WeatherComponent implements OnInit {
    private geolocationPosition: Position;
    city: String;
    temperature: number;
    weather: String;
    noCity : Promise<boolean>;

    constructor(private http: Http, private inhabitant: InhabitantService) {
    }

    ngOnInit() {
        let member = this.inhabitant.getCurrentMember();
        forkJoin(member).subscribe(resu => {
            this.city = resu[0].city;
            this.setGeolocation();
        });
        if(this.city == null || this.city == undefined || this.city == "") {
            this.noCity = Promise.resolve(true);
        }
    }

    private setGeolocation() {
        if (this.city == null || this.city == undefined || this.city == "") {
            console.log("here");
            if (window.navigator && window.navigator.geolocation) {
                window.navigator.geolocation.getCurrentPosition(
                    position => {
                        this.geolocationPosition = position;
                        this.callOpenWeatherApi(`${API_WEATHER_URL}weather?` +
                            `lat=${this.geolocationPosition.coords.latitude}` +
                            `&lon=${this.geolocationPosition.coords.longitude}` +
                            `&units=metric` +
                            `&appid=${APP_ID}`);
                    },
                    error => {
                        switch (error.code) {
                            case 1:
                                console.log('Permission Denied');
                                break;
                            case 2:
                                console.log('Position Unavailable');
                                break;
                            case 3:
                                console.log('Timeout');
                                break;
                        }
                    }
                );
            }
        } else {
            this.callOpenWeatherApi(`${API_WEATHER_URL}weather?` + `q=` + this.city + `&units=metric` + `&appid=${APP_ID}`);
        }
    }

    private callOpenWeatherApi(url: string) {
        // Do not delete, previous versions
        /*this.http.get(`${API_WEATHER_URL}weather?` +
            `lat=${this.geolocationPosition.coords.latitude}` +
            `&lon=${this.geolocationPosition.coords.longitude}` +
            `&units=metric` +
            `&appid=${APP_ID}`)
            .subscribe(res => {
                this.city = JSON.parse(res['_body']).name;
                this.temperature = Math.round(JSON.parse(res['_body']).main.temp);
                this.weather = JSON.parse(res['_body']).weather[0].main;
            });
        this.http.get(`${API_WEATHER_URL}weather?` + `q=London` + `&units=metric` + `&appid=${APP_ID}`)
            .subscribe(res => {
                console.log(JSON.parse(res['_body']));
                this.city = JSON.parse(res['_body']).name;
                // this.city = "London";
                this.temperature = Math.round(JSON.parse(res['_body']).main.temp);
                this.weather = JSON.parse(res['_body']).weather[0].main;
                // this.weather = JSON.parse(res['_body']).weather[0].main;
                console.log('City : ' + this.city);
                console.log('Temperature : ' + this.temperature);
                console.log('Weather : ' + this.weather);
            });*/
        this.http.get(url)
            .subscribe(res => {
                this.city = JSON.parse(res['_body']).name;
                this.temperature = Math.round(JSON.parse(res['_body']).main.temp);
                this.weather = JSON.parse(res['_body']).weather[0].main;
            });
    }


}
