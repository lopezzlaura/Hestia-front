import { InhabitantModifierModule } from './../inhabitant-modifier/app-inhabitant-modifier.module';
import { MaterializeModule } from 'angular2-materialize';
import { InhabitantComponent } from './app-inhabitant.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from "@angular/router";

@NgModule({
  declarations: [InhabitantComponent],
  imports: [ CommonModule,  MaterializeModule, InhabitantModifierModule,RouterModule ],
  exports: [InhabitantComponent],
  providers: [],
})
export class InhabitantModule {}
