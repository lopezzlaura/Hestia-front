import {SearchBarModule} from './admin/search-bar';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {InhabitantsModule} from './admin/inhabitants';
import {AppRoutingModule} from '../app-routing.module';
import {FooterModule} from './footer/app-footer.module';
import {NavBarModule} from './navbar/nav-bar.module';
import {CommonPageComponent} from './app-common.component';
import { MaterializeModule } from "angular2-materialize";
import {ProfilComponent} from './profil/profil.component';

@NgModule({
    declarations: [CommonPageComponent, ProfilComponent],
    imports: [CommonModule,
        InhabitantsModule, AppRoutingModule, SearchBarModule, FooterModule, NavBarModule, FormsModule, ReactiveFormsModule, MaterializeModule],
    exports: [CommonPageComponent],
    providers: [],
})
export class CommonPageModule {
}
