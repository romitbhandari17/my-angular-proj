import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PortalComponent } from './portal/portal.component';
import { CampaignListingComponent } from './portal/campaigns/campaign-listing/campaign-listing.component';
import { CreateCampaignComponent } from './portal/campaigns/create-campaign/create-campaign.component';
import { CampaignDetailsComponent } from './portal/campaigns/campaign-details/campaign-details.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './_guards';

//This is my case
const routes: Routes = [
    { path: '', redirectTo: "/campaigns", pathMatch:"full", canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    //{path: '', redirectTo: "/campaigns", pathMatch:"full"}, //another value = prefix
    {
        path: 'campaigns', component: PortalComponent, canActivate: [AuthGuard], children: [
            { path: '', component: CampaignListingComponent },
            { path: 'details/:id/:breadcrumb', component: CampaignDetailsComponent },
            { path: 'create', component: CreateCampaignComponent,
                data: { breadcrumb: 'Create'} 
            },
            //{ path: 'edit/:id', component: CreateCampaignTabPanelComponent },
        ],
        data: {
            breadcrumb: 'Campaigns'
        }
    },
    {
        path: 'insights', component: PortalComponent, canActivate: [AuthGuard], children: [
            //{ path: '', component: IntegrationsComponent },
            //{ path: 'rest-api', component: RestApiComponent}
        ],
        data: {
            breadcrumb: 'Insights'
        }
    },
    //{path: 'departments/:id', component: CampaignDetailsComponent},
    {path: "**", redirectTo: "/campaigns", pathMatch:"full", canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
//export const RoutingComponents = [EmployeeListComponent, DepartmentListComponent, DepartmentDetailsComponent];