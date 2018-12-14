import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { NavBarComponent } from './common/nav-bar/nav-bar.component';
import { FooterComponent } from './common/footer/footer.component';
import { AppRoutingModule } from './app-routing.module';
import { CreateCampaignComponent } from './portal/campaigns/create-campaign/create-campaign.component';
import { CampaignListingComponent } from './portal/campaigns/campaign-listing/campaign-listing.component';
import { PortalComponent } from './portal/portal.component';
import {DataTableModule} from "angular-6-datatable";
import { PortalBreadcrumbComponent } from './common/portal-breadcrumb/portal-breadcrumb.component';
import {BreadcrumbsModule} from "ng6-breadcrumbs";
import { RoutingService } from './_services/routing.service';
import { DataTableComponent } from './common/data-table/data-table.component';
import { CampaignDetailsComponent } from './portal/campaigns/campaign-details/campaign-details.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { CampaignTabPanelComponent } from './portal/campaigns/campaign-details/campaign-tab-panel/campaign-tab-panel.component';
import { CampaignContentComponent } from './portal/campaigns/campaign-details/campaign-content/campaign-content.component';
import { CampaignDashboardComponent } from './portal/campaigns/campaign-details/campaign-dashboard/campaign-dashboard.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './_guards';
import { AlertComponent } from './_directives';
import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { AlertService, AuthenticationService, UserService } from './_services';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { fakeBackendProvider } from './_helpers';
import { CampaignService } from './portal/campaigns/campaign.service';

@NgModule({
  declarations: [
    AppComponent,
    CreateCampaignComponent,
    CampaignListingComponent,
    NavBarComponent,
    FooterComponent,
    PortalComponent,
    PortalBreadcrumbComponent,
    DataTableComponent,
    CampaignDetailsComponent,
    CampaignTabPanelComponent,
    CampaignContentComponent,
    CampaignDashboardComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    AlertComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DataTableModule,
    BreadcrumbsModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    HttpClientModule
  ],
  providers: [RoutingService,
              AuthGuard,
              AlertService,
              AuthenticationService,
              UserService,
              CampaignService,
              { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
              { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
              // provider used to create fake backend
              fakeBackendProvider],
              bootstrap: [AppComponent]
})
export class AppModule { }
