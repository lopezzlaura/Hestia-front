import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";

import {HomePageComponent} from "./common/homepage/app-homepage.component";
import {CommonPageComponent} from "./common/app-common.component";
import {AuthGuard} from "./guards/auth-guard";
import {HomeIndexComponent} from "./common/index";
import {VisuIncidentsComponent} from "./declaration/visu-incidents/visu-incidents.component";
import {ProfilComponent} from "./common/profil/profil.component";
import {IndexDeclarationComponent} from "./declaration/front-declare/index-declaration/index-declaration.component";
import {VisuIotComponent} from "./declaration/visu-iot/visu-iot.component";

const routes: Routes = [
    {path: "", redirectTo: "index", pathMatch: "full"},
    {path: "index", component: HomePageComponent},
    {
        path: "home", component: CommonPageComponent, canActivate: [AuthGuard], canActivateChild: [AuthGuard],
        children: [
            {path: "welcome", component: HomeIndexComponent},
            {path: "declare", component: IndexDeclarationComponent},
            {path: "visuIncidents", component: VisuIncidentsComponent},
            {path: "visuIOT", component: VisuIotComponent},
            {path: "profil", component: ProfilComponent}
        ]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: "reload"})],
    exports: [RouterModule],

})
export class AppRoutingModule {
}
