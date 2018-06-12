import { NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FrontDeclareComponent} from "./front-declare.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { MaterializeModule } from "angular2-materialize";
import { DialogInhabitantComponent } from "./dialog-inhabitant.component"
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DatePipe } from '@angular/common';


@NgModule({
  imports: [MaterializeModule, CommonModule, FormsModule, ReactiveFormsModule, BrowserAnimationsModule, MatButtonModule, MatDialogModule],
  exports: [FrontDeclareComponent],
  declarations: [FrontDeclareComponent, DialogInhabitantComponent],
  providers: [DatePipe],
  entryComponents: [DialogInhabitantComponent]
})
export class FrontDeclareModule {
}
