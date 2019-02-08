import { RoutingService } from '../_services/routing.service';
import {
    AfterViewInit,
    Component,
    ElementRef,
    HostListener,
    OnChanges,
    OnDestroy,
    OnInit,
    ViewChild
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-portal-component',
  templateUrl: './portal.component.html',
  styleUrls: ['./portal.component.css']
})
export class PortalComponent implements OnInit, OnDestroy {

    constructor(public router: Router,
                public routingService: RoutingService) { }
    breadCrumbSubs:any;
    breadcrumbEvent:any[]=[];
    routerSubs:any;
    @ViewChild('navbar') private navbar: ElementRef;
    @ViewChild('breadcrumb') private breadcrumb: ElementRef;
    @ViewChild('container') private container: ElementRef;

    @HostListener('window:resize', ['$event.target'])
    public onResize() {
        this.setContainerHeight();
    }

    ngOnInit() {

      //console.log('ngOnInit in portal');
      
      this.routerSubs = this.router.events.subscribe((res) => { 
        // if(this.router.url.endsWith('search')){
        //   this.showBreadCrumb=false;
        // }
        //console.log('router url=', this.router.url);
        this.routingService.setbreadCrumbUrl(this.router.url);
      });

      //setTimeout(function(){ }, 3000);
      this.breadCrumbSubs = this.routingService.breadCrumbEmitter
          .subscribe((breadcrumb) => {
              this.breadcrumbEvent = breadcrumb;
              //console.log('breadcrumb event=', this.breadcrumbEvent );
          });

      this.setContainerHeight();
    }

    public ngOnDestroy(): void {
      this.breadCrumbSubs.unsubscribe();
      this.routerSubs.unsubscribe();
    }

    private setContainerHeight() {
     
        if (this.navbar && this.breadcrumb && this.container) {
            //alert('portal comp, window height='+ window.innerHeight);
            // this.container.nativeElement.style.height =
            //     (window.innerHeight - (50+ this.navbar.nativeElement.offsetHeight + this.breadcrumb.nativeElement.offsetHeight)) + 'px';
        }
    }
}
