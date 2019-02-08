import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-campaign-content',
  templateUrl: './campaign-content.component.html',
  styleUrls: ['./campaign-content.component.css']
})
export class CampaignContentComponent implements OnInit {

  @Input() public selectedTab:any;

  constructor(private activatedRoute: ActivatedRoute) { }
  private paramsSubs: any;
  private orderId:number;
  
  ngOnInit() {
    this.paramsSubs = this.activatedRoute.params
        .subscribe((params) => {
            this.orderId = +params['id'];
            //console.log('orderId in campaign content=', this.orderId);
            //this.loadDashboardDetails(this.orderId);
        });
  }

}
