import {WeatherComponent} from './app-weather.component';
import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
@NgModule({
  declarations: [WeatherComponent],
  imports: [CommonModule],
  exports: [WeatherComponent],
  providers: [],
})
export class WeatherModule {
}
