import { EventEmitter, Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';



@Injectable()
export class RoutingService {

    //public emailStatusEmitter: EventEmitter<any>;
    public breadCrumbEmitter: EventEmitter<any>;
    //public loadBreadCrumb: EventEmitter<boolean>;
    //public removeClockEmitter: EventEmitter<boolean>;

    constructor(
        private router: Router) {
        //this.navPanel = new EventEmitter();
        this.breadCrumbEmitter = new EventEmitter<any>();
        //this.loadBreadCrumb = new EventEmitter<boolean>();
        //this.emailStatusEmitter = new EventEmitter<any>();
        //this.removeClockEmitter = new EventEmitter<any>();
    }

    private breadCrumbConfig = {
        // Admin bread crumbs
        //adminListUsers: { html: 'User', view: 'admin-list-user', module: 'admin' },
        
        //Search module
        search: { html: 'Search', view: 'search-page', module: 'portal' },

        //Campaign module
        campaignListing: { html: 'Campaigns', view: 'campaign-listing', module: 'portal' },

        createCampaign: { html: 'Create Campaign', view: 'campaign-create', module: 'portal' },

        editCampaign: { html: 'Edit Campaign', view: 'campaign-edit', module: 'portal' },

        campaignDetails: { html: 'Campaign Details', view: 'campaign-details', module: 'portal' },
    }


    public setbreadCrumbUrl(url:string){
        let breadCrumb: object[] = [];
        let haveButtons: boolean;

        if(url.includes('/campaigns/create')){
            breadCrumb.push(this.breadCrumbConfig.campaignListing);
            breadCrumb.push(this.breadCrumbConfig.createCampaign);
        }else if(url.includes('/search/edit')){
            breadCrumb.push(this.breadCrumbConfig.campaignListing);
            breadCrumb.push(this.breadCrumbConfig.editCampaign);
        }else if(url.includes('/campaigns/details')){
            breadCrumb.push(this.breadCrumbConfig.campaignListing);
            breadCrumb.push(this.breadCrumbConfig.campaignDetails);
        }else if(url.includes('/search')){
            breadCrumb.push(this.breadCrumbConfig.search);
        }
        else if(url.includes('/campaigns')){
            breadCrumb.push(this.breadCrumbConfig.campaignListing);
        }

        //console.log('Links', breadCrumb);

       this.breadCrumbEmitter.emit({links:breadCrumb});
    }

    // Route Component views
    public showView(view: string, param?: any, id?: any, tab?: string, dynamicBreadcrumb?:any) {
        //alert(view)
        switch (view) {
            // campaign create
            case 'campaign-create':
                this.router.navigate(['/campaigns/create']);
                break;
            // case 'campaign-details':
            //     this.router.navigate(['/campaigns/details', id, dynamicBreadcrumb]);
            //     break;
            case 'campaign-details':
                this.router.navigate(['/campaigns/details', id]);
                break;

            case 'campaign-listing':
                this.router.navigate(['/campaigns']);
                break;

            case 'search':
                this.router.navigate(['/search']);
                break;

            case 'campaign-edit':
                this.router.navigate(['/search/edit', id]);
                break;
            default:
                break;
        }
    }
}