import {
    Component,
    ElementRef,
    HostListener,
    Input,
    OnInit,
    SimpleChanges,
    ViewChild,
    ViewChildren
} from '@angular/core';
import { RoutingService } from 'src/app/_services/routing.service';

@Component({
  selector: 'p-breadcrumb',
  templateUrl: './p-breadcrumb.component.html',
  styleUrls: ['./p-breadcrumb.component.css']
})
export class PBreadcrumbComponent implements OnInit {
    constructor(private routingService: RoutingService) {}
    ngOnInit(): void {
       
    }

    @Input() public links: any[] = [];
    // @Input() public buttons: boolean

    public showView(view: string, param: any): void {
        // console.log('view=', view);
        // console.log('param=', param);
        if (!param) {
            this.routingService.showView(view);
        } else {
            this.routingService.showView(view, param);
        }
    }

    ngOnChanges(changes:SimpleChanges){
        //console.log('breadcrumb links=', changes);
    }
}
