import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FrontDeclareInhabitantComponent} from "./form-inhabitant-issues/front-declare-inhabitant.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MaterializeModule} from "angular2-materialize";
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DatePipe} from '@angular/common';
import {DialogInhabitantComponent} from "./dialog-inhabitant/dialog-inhabitant.component";
import {IndexDeclarationComponent} from "./index-declaration/index-declaration.component";
import {FrontDeclareIotComponent} from "./form-iot-issues/front-declare-iot.component";
import {RouterModule, Routes} from "@angular/router";
import {CommonPageComponent} from "../../common/app-common.component";
import {AuthGuard} from "../../guards/auth-guard";

const appRoutes: Routes = [
    {
        path: "home/declare", component: CommonPageComponent, canActivate: [AuthGuard], canActivateChild: [AuthGuard],
        children: [
            {path: 'objects', component: FrontDeclareIotComponent},
            {path: 'inhabitants', component: FrontDeclareInhabitantComponent}
        ]
    },
];

@NgModule({
    imports: [MaterializeModule, CommonModule, FormsModule, ReactiveFormsModule, BrowserAnimationsModule, MatButtonModule, MatDialogModule, RouterModule.forRoot(appRoutes)],
    exports: [IndexDeclarationComponent],
    declarations: [FrontDeclareInhabitantComponent, IndexDeclarationComponent, DialogInhabitantComponent, FrontDeclareIotComponent],
    providers: [DatePipe],
    entryComponents: [DialogInhabitantComponent]
})
export class FrontDeclareModule {
}
