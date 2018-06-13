import {HomeIndexComponent} from './app-index.component';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FooterModule} from '../footer/app-footer.module';
import {NavBarModule} from '../navbar/nav-bar.module';
import {WeatherModule} from './weather/app-weather.module';
import {HistoryComponent} from './history/history.component';

import {RankingModule} from "./ranking/ranking.module";
import {RankingComponent} from "./ranking/ranking.component";
import {HolidayModeComponent} from './holidaymode/holiday-mode.component';
import {HolidayModeModule} from "./holidaymode/holiday-mode.module";

@NgModule({
    declarations: [HomeIndexComponent, HistoryComponent],
    imports: [CommonModule,
        FooterModule, NavBarModule, WeatherModule, RankingModule, HolidayModeModule],
    exports: [HomeIndexComponent],
    providers: [],
})
export class HomeIndexModule {
}
