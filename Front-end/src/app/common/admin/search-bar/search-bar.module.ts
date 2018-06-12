import { InhabitantModifierModule } from '../inhabitant-modifier';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchBarComponent } from './search-bar.component';
import { MaterializeModule } from 'angular2-materialize';

@NgModule({
  declarations: [SearchBarComponent],
  imports: [ CommonModule, MaterializeModule, InhabitantModifierModule],
  exports: [SearchBarComponent],
  providers: [],
})
export class SearchBarModule {}
