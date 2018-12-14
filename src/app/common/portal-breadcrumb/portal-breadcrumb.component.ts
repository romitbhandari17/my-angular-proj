import { Component, ElementRef, HostListener, Input, OnInit, ViewChild, ViewChildren } from '@angular/core';

@Component({
  selector: 'app-portal-breadcrumb',
  templateUrl: './portal-breadcrumb.component.html',
  styleUrls: ['./portal-breadcrumb.component.css']
})
export class PortalBreadcrumbComponent implements OnInit {
    @Input() public links: any[] = [];
    @Input() public buttons: boolean;
    @ViewChildren('myLink') public breadCrumbs: any;
    @ViewChild('breadcrumbContainer') public breadcrumbContainer: ElementRef;

    constructor() {}

    @HostListener('window:resize', ['$event.target'])
    public onResize(): void {
        this.setBreadCrumbWidth();
    }

    ngOnInit(){
    }

    public ngOnChanges(): void {
        this.setBreadCrumbWidth();
    }

    public ngAfterViewInit(): void {
       this.setBreadCrumbWidth();
    }

    /*public showView(event: any, view: string, param: any): void {
        let lastIndex = this.links.length - 1;
        if (this.links[lastIndex].view !== view) {
            if (!param) {
                this.routingService.showView(view);
            } else {
                this.routingService.showView(view, param);
            }
        }
    }*/

    private setBreadCrumbWidth(): void {
        setTimeout(() => {
            let totalWidth: number = this.breadcrumbContainer.nativeElement.offsetWidth;
            console.log('totalWidth', totalWidth);
            let widthSum: number = 0;
            if (this.breadCrumbs && this.breadCrumbs.toArray().length > 0) {
                let linksCount: number = this.breadCrumbs.toArray().length;
                let breadCrumbsArray: ElementRef[] = this.breadCrumbs.toArray();
                console.log('breadCrumbsArray', breadCrumbsArray);
                for (let element of breadCrumbsArray) {
                    element.nativeElement.style.width = 'auto';
                    let i: number = breadCrumbsArray.indexOf(element);
                    if (i < linksCount - 1) {
                        widthSum += element.nativeElement.offsetWidth;
                    }
                }
                let lastLink: ElementRef = breadCrumbsArray[linksCount - 1];
                lastLink.nativeElement.style.width = ((totalWidth - widthSum) -  (linksCount * 10 )) + 'px';
            }
        });
    }
}
