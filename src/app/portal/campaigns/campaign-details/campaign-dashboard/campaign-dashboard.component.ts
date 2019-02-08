import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-campaign-dashboard',
  templateUrl: './campaign-dashboard.component.html',
  styleUrls: ['./campaign-dashboard.component.css']
})
export class CampaignDashboardComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute) { }
  public orderId:number;
  private paramsSubs: any;

  ngOnInit() {
    this.paramsSubs = this.activatedRoute.params
        .subscribe((params) => {
            this.orderId = +params['id'];
            //console.log('orderId in dashboard=', this.orderId);
            //this.loadDashboardDetails(this.orderId);
        });
  }

}
