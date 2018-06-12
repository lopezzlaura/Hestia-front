import { HomeIndexComponent } from './app-index.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FooterModule} from '../footer/app-footer.module';
import {NavBarModule} from '../navbar/nav-bar.module';
import {WeatherModule} from './weather/app-weather.module';
import { HistoryComponent } from './history/history.component';

import {RankingModule} from "./ranking/ranking.module";
import {RankingComponent} from "./ranking/ranking.component";

@NgModule({
  declarations: [HomeIndexComponent, HistoryComponent],
  imports: [ CommonModule,
   FooterModule, NavBarModule, WeatherModule, RankingModule],
  exports: [HomeIndexComponent],
  providers: [],
})
export class HomeIndexModule {}
