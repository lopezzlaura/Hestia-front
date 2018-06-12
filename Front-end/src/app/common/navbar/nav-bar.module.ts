import {NavBarComponent} from './nav-bar.component';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MaterializeModule} from 'angular2-materialize';
import {AngularFontAwesomeModule} from 'angular-font-awesome';
import {RouterModule} from '@angular/router';

@NgModule({
  imports: [CommonModule, MaterializeModule, RouterModule, AngularFontAwesomeModule],
  exports: [NavBarComponent],
  declarations: [NavBarComponent],
  providers: [],
})
export class NavBarModule {
}
