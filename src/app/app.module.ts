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
import { PBreadcrumbComponent } from './common/p-breadcrumb/p-breadcrumb.component';
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
import { SearchComponent } from './portal/search/search.component';
import { TopicSearchFilterComponent } from './portal/search/topic-search-filter/topic-search-filter.component';
import { SearchTabPanelComponent } from './portal/search/search-tab-panel/search-tab-panel.component';
import { FilterTabPanelComponent } from './portal/search/filter-tab-panel/filter-tab-panel.component';
import { SearchResultsComponent } from './portal/search/search-results/search-results.component';
import { SearchService } from './portal/search/search.service';
import { EmployeeSizeFilterComponent } from './portal/search/filter-tab-panel/employee-size-filter/employee-size-filter.component';
import { IndustryFilterComponent } from './portal/search/filter-tab-panel/industry-filter/industry-filter.component';
import { PModal } from './common/p-modal/p-modal.component';
import { PDataTableComponent } from './common/p-data-table/p-data-table.component';
import { PipeDataTablePipe } from './_pipes/pipe-data-table.pipe';
import { PMultiselectListComponent } from './common/p-multiselect-list/p-multiselect-list.component';
import { StatusFilterComponent } from './portal/search/filter-tab-panel/status-filter/status-filter.component';
import { SalesownerFilterComponent } from './portal/search/filter-tab-panel/salesowner-filter/salesowner-filter.component';
import { SaveAsCampaignComponent } from './portal/search/save-as-campaign/save-as-campaign.component';

@NgModule({
  declarations: [
    AppComponent,
    CreateCampaignComponent,
    CampaignListingComponent,
    NavBarComponent,
    FooterComponent,
    PortalComponent,
    PBreadcrumbComponent,
    DataTableComponent,
    CampaignDetailsComponent,
    CampaignTabPanelComponent,
    CampaignContentComponent,
    CampaignDashboardComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    AlertComponent,
    SearchComponent,
    TopicSearchFilterComponent,
    SearchTabPanelComponent,
    FilterTabPanelComponent,
    SearchResultsComponent,
    EmployeeSizeFilterComponent,
    IndustryFilterComponent,
    PModal,
    PDataTableComponent,
    PipeDataTablePipe,
    PMultiselectListComponent,
    StatusFilterComponent,
    SalesownerFilterComponent,
    SaveAsCampaignComponent
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
              SearchService,
              { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
              { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
              // provider used to create fake backend
              fakeBackendProvider],
              bootstrap: [AppComponent]
})
export class AppModule { }
