import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MaterializeModule} from "angular2-materialize"
import {StatePipe} from "../../../shared/utils/state.pipe";
import {IssueModule} from "../issue/issue.module";
import {DragulaModule} from "ng2-dragula";
import {VisuIncidentsComponent} from "./visu-incidents/visu-incidents.component";
import {IssueIotModule} from "./visu-iot/issue-iot/issue-iot.module";
import {VisuIotComponent} from "./visu-iot/visu-iot.component";
import {Incidents_catPipe} from "./visu-incidents/incidents_cat.pipe";
import {UserPipe} from "../../../shared/utils/user.pipe";

@NgModule({
    imports: [MaterializeModule, CommonModule, IssueIotModule, IssueModule, DragulaModule],
    exports: [VisuIncidentsComponent, VisuIotComponent],
    declarations: [VisuIotComponent, VisuIncidentsComponent,  Incidents_catPipe, UserPipe, StatePipe],
    providers: []
})
export class VisuPagesModule {
}
