import { EventEmitter, Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';



@Injectable()
export class RoutingService {

    //public emailStatusEmitter: EventEmitter<any>;
    //public breadCrumbEmitter: EventEmitter<any>;
    //public loadBreadCrumb: EventEmitter<boolean>;
    //public removeClockEmitter: EventEmitter<boolean>;

    constructor(
        private router: Router) {
        //this.navPanel = new EventEmitter();
        //this.breadCrumbEmitter = new EventEmitter<any>();
        //this.loadBreadCrumb = new EventEmitter<boolean>();
        //this.emailStatusEmitter = new EventEmitter<any>();
        //this.removeClockEmitter = new EventEmitter<any>();
    }

    // Route Component views
    public showView(view: string, param?: any, id?: any, tab?: string, dynamicBreadcrumb?:any) {
        //alert(view)
        switch (view) {
            // Admin views
            case 'campaign-create':
                this.router.navigate(['/campaigns/create']);
                break;
            case 'campaign-details':
                this.router.navigate(['/campaigns/details', id, dynamicBreadcrumb]);
                break;
            case 'campaign-listing':
                this.router.navigate(['/campaigns']);
                break;
            default:
                break;
        }
    }
}