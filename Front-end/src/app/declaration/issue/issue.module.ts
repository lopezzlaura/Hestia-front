import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IssueComponent} from './issue.component';
import {DialogOverviewComponent} from "./dialog-overview.component";
import {MatDialogModule} from '@angular/material/dialog';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from '@angular/material/button';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterializeModule} from "angular2-materialize";

@NgModule({
    declarations: [IssueComponent, DialogOverviewComponent],
    imports: [CommonModule, MatDialogModule, BrowserAnimationsModule, FormsModule, ReactiveFormsModule, MaterializeModule, MatButtonModule],
    exports: [IssueComponent],
    providers: [],
    entryComponents: [DialogOverviewComponent]
})
export class IssueModule {
}
