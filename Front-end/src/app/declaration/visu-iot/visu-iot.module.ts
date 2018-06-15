import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MaterializeModule} from "angular2-materialize";
import {VisuIotComponent} from "./visu-iot.component";
import {IssueIotModule} from "./issue-iot/issue-iot.module";

@NgModule({
    imports: [MaterializeModule, CommonModule, IssueIotModule],
    exports: [VisuIotComponent],
    declarations: [VisuIotComponent],
    providers: []
})
export class VisuIotModule {
}
