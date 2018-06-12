import { InhabitantModule } from './../inhabitant/app-inhabitant.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InhabitantsComponent } from './app-inhabitants.component';

@NgModule({
  declarations: [InhabitantsComponent],
  imports: [ CommonModule, InhabitantModule ],
  exports: [InhabitantsComponent],
  providers: [],
})
export class InhabitantsModule {}
