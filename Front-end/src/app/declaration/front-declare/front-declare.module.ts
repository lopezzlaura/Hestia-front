import { NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FrontDeclareInhabitantComponent} from "./form-inhabitant-issues/front-declare-inhabitant.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { MaterializeModule } from "angular2-materialize";
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DatePipe } from '@angular/common';
import {DialogInhabitantComponent} from "./dialog-inhabitant/dialog-inhabitant.component";


@NgModule({
  imports: [MaterializeModule, CommonModule, FormsModule, ReactiveFormsModule, BrowserAnimationsModule, MatButtonModule, MatDialogModule],
  exports: [FrontDeclareInhabitantComponent],
  declarations: [FrontDeclareInhabitantComponent, DialogInhabitantComponent],
  providers: [DatePipe],
  entryComponents: [DialogInhabitantComponent]
})
export class FrontDeclareModule {
}
