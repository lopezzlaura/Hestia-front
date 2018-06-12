import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {RankingComponent} from "./ranking.component";

@NgModule({
    declarations: [RankingComponent],
    imports: [CommonModule],
    exports: [RankingComponent],
    providers: [],
})
export class RankingModule {
}
