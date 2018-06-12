import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InhabitantModifierComponent } from './app-inhabitant-modifier.component';

@NgModule({
  declarations: [InhabitantModifierComponent],
  imports: [ CommonModule, FormsModule ],
  exports: [InhabitantModifierComponent],
  providers: [],
})
export class InhabitantModifierModule {}
