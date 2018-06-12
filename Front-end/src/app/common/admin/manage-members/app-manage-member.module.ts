import {SearchBarModule} from '../search-bar';
import {ManageMemberComponent} from './app-manage-member.component';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {InhabitantsModule} from '../inhabitants';
import {FooterModule} from '../../footer/app-footer.module';
import {NavBarModule} from '../../navbar/nav-bar.module';

@NgModule({
  declarations: [ManageMemberComponent],
  imports: [CommonModule,
    InhabitantsModule, SearchBarModule, FooterModule, NavBarModule],
  exports: [ManageMemberComponent],
  providers: [],
})
export class ManageMemberModule {
}
