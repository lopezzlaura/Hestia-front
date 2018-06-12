import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {Incidents_catPipe} from "./incidents_cat.pipe";
import {StatePipe} from "../../../shared/utils/state.pipe";
import {VisuIncidentsComponent} from "./visu-incidents.component";
import {MaterializeModule} from "angular2-materialize";
import {IssueModule} from "../issue/issue.module";
import {DragulaModule} from "ng2-dragula";


@NgModule({
    imports: [MaterializeModule, CommonModule, IssueModule, DragulaModule],
    exports: [VisuIncidentsComponent],
    declarations: [VisuIncidentsComponent, Incidents_catPipe, StatePipe],
    providers: []
})
export class VisuIncidentsModule {
}
