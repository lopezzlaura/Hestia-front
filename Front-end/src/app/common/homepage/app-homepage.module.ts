import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from '../navbar/nav-bar.component';
import { MaterializeModule } from 'angular2-materialize';
import { HomePageComponent } from './app-homepage.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
@NgModule({
    imports: [CommonModule, MaterializeModule, FormsModule, ReactiveFormsModule, HttpClientModule],
    exports: [HomePageComponent],
    declarations: [HomePageComponent],
    providers: [],
})
export class HomePageModule { }
