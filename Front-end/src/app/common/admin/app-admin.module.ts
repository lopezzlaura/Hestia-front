import { SearchBarModule } from './search-bar';
import { AdminComponent } from './app-admin.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InhabitantsModule } from './inhabitants';
import {FooterModule} from '../footer/app-footer.module';
import {NavBarModule} from '../navbar/nav-bar.module';
import { HttpModule } from '@angular/http';

@NgModule({
  declarations: [AdminComponent],
  imports: [ CommonModule,
  InhabitantsModule, SearchBarModule, FooterModule, NavBarModule, HttpModule],
  exports: [AdminComponent],
  providers: [],
})
export class AdminModule {}
