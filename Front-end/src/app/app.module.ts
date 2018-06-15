import {PasswordGenerator} from "../shared/utils/password.generator";
import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {AppComponent} from "./app.component";
import {AppRoutingModule} from "./app-routing.module";
import {NavBarModule} from "./common/navbar/nav-bar.module";
import {HomePageModule} from "./common/homepage/app-homepage.module";
import {AuthService} from "../shared/services/auth/auth.service";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {FormsModule} from '@angular/forms';
import {TokenInterceptor} from "../shared/services/auth/token.interceptor";
import {AdminModule} from "./common/admin";
import {RestService} from "../shared/services/rest/rest.service";
import {UnauthorizedInterceptor} from "../shared/services/auth/unauthorized.interceptor";
import {CommonPageModule} from "./common/app-common.module";
import {AdminService} from "../shared/services/admin.service";
import {ManageMemberModule} from "./common/admin/manage-members";
import {AuthGuard} from "./guards/auth-guard";
import {ReactiveFormsModule} from '@angular/forms/'
import {HomeIndexModule} from "./common/index";
import {AdminGuard} from "./guards/admin-guard";
import {GuardHelper} from "./guards/guard-helper";
import {ManagerGuard} from "./guards/manager-guard";
import {WeatherModule} from "./common/index/weather";
import {IssueService} from "../shared/services/issue.service";
import {StateService} from "../shared/services/state.service";
import {TypeService} from "../shared/services/type.service";
import {InhabitantService} from "../shared/services/inhabitant.service";
import {MaterializeModule} from "angular2-materialize";
import {FrontDeclareModule} from "./declaration/front-declare/front-declare.module";
import {EmergencyService} from "../shared/services/emergency.service";
import {IssueModule} from "./declaration/issue/issue.module";
import {MemberGuard} from "./guards/member-guard";
import {GuestGuard} from "./guards/guest-guard";
import {RankingModule} from "./common/index/ranking/ranking.module";
import {RankingService} from "../shared/services/ranking.service";
import {AssignmentService} from "../shared/services/assignment.service";
import {HistoryService} from "../shared/services/history.service";
import {ConnectedObjectService} from "../shared/services/connected_object.service";
import {HolidayService} from "../shared/services/holiday.service";
import {HolidayModeModule} from "./common/index/holidaymode/holiday-mode.module";
import {AreaService} from "../shared/services/area.service";
import {ConnectedObjectRequestService} from "../shared/services/connected_object_request.service";
import {IssueIotModule} from "./declaration/visu-pages/visu-iot/issue-iot/issue-iot.module";
import {VisuPagesModule} from "./declaration/visu-pages/visu-pages.module";

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        NavBarModule,
        ReactiveFormsModule,
        HomePageModule,
        HomeIndexModule,
        ManageMemberModule,
        WeatherModule,
        RankingModule,
        HolidayModeModule,
        FormsModule,
        AdminModule,
        CommonPageModule,
        MaterializeModule,
        FrontDeclareModule,
        IssueIotModule,
        VisuPagesModule,
        IssueModule
    ],
    providers: [
        AuthService,
        AssignmentService,
        AdminService,
        RestService,
        IssueService,
        StateService,
        HolidayService,
        RankingService,
        TypeService,
        InhabitantService,
        EmergencyService,
        HistoryService,
        AreaService,
        ConnectedObjectService,
        ConnectedObjectRequestService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: TokenInterceptor,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: UnauthorizedInterceptor,
            multi: true
        },
        GuardHelper,
        AuthGuard,
        AdminGuard,
        ManagerGuard,
        MemberGuard,
        GuestGuard,
        PasswordGenerator
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
