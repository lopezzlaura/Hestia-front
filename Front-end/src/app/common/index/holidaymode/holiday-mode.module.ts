import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {HolidayModeComponent} from "./holiday-mode.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@NgModule({

    declarations: [HolidayModeComponent],
    imports: [CommonModule, FormsModule, ReactiveFormsModule],
    exports: [HolidayModeComponent],
    providers: [],
})
export class HolidayModeModule {
}
