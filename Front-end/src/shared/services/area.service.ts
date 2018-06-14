import {Injectable} from '@angular/core';
import {API_URL} from './rest/constants';
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Observable} from 'rxjs/Observable';
import {AreaModel} from "../models/AreaModel";


@Injectable()
export class AreaService {

    private areaList$: Observable<AreaModel[]>;


    constructor(private http: HttpClient) {
    }

    public getAreas(): Observable<AreaModel[]> {
        this.areaList$ = this.http.get<AreaModel[]>(API_URL + 'Areas');
        return this.http.get<AreaModel[]>(API_URL + 'Areas').map(models => models.map(model => {
            return new AreaModel(model.id, model.type, model.name);
        }));
    }

    public getAreasOfType(type: string): Observable<AreaModel[]> {
        this.areaList$ = this.http.get<AreaModel[]>(API_URL + 'Areas');
        return this.http.get<AreaModel[]>(API_URL + 'Areas').map(models => models.map(model => {
            return new AreaModel(model.id, model.type, model.name);
        }));
    }

    public getArea(id: number): Observable<AreaModel> {
        return this.http.get<AreaModel>(API_URL + 'Areas/' + id);
    }

    public postArea(areaType: string): void {
        let area = {
            type: areaType
        };
        this.http.post(API_URL + 'Areas', area).subscribe(data => {
        });
    }
}
