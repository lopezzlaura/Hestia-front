import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MaterializeModule} from "angular2-materialize";
import {Incidents_catPipe} from "../visu-incidents/incidents_cat.pipe";
import {StatePipe} from "../../../shared/utils/state.pipe";
import {ConnectedObjectRequestModel} from "../../../shared/models/ConnectedObjectRequestModel";
import {VisuIotComponent} from "./visu-iot.component";
import {IssueIotModule} from "../issue/issue-iot/issue-iot.module";

@NgModule({
    imports: [MaterializeModule, CommonModule, ConnectedObjectRequestModel, IssueIotModule],
    exports: [VisuIotComponent],
    declarations: [VisuIotComponent, Incidents_catPipe, StatePipe],
    providers: []
})
export class VisuIotModule {
}
