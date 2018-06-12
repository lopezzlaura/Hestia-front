import {FooterComponent} from './app-footer.component';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MaterializeModule} from 'angular2-materialize';

@NgModule({
  imports: [CommonModule, MaterializeModule],
  exports: [FooterComponent],
  declarations: [FooterComponent],
  providers: [],
})
export class FooterModule {
}
