import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-campaign-tab-panel',
  templateUrl: './campaign-tab-panel.component.html',
  styleUrls: ['./campaign-tab-panel.component.css']
})
export class CampaignTabPanelComponent implements OnInit {

  private selectedTab:any=[];
  constructor(private activatedRoute: ActivatedRoute) { }
  private paramsSubs: any;
  public ngOnInit(): void {
    this.selectedTab.tab = 'Dashboard';

    //this.width = window.innerWidth;
    this.paramsSubs = this.activatedRoute.params
        .subscribe((params) => {
            this.selectedTab.orderId = +params['id'];
            console.log('orderId=', this.selectedTab.orderId);
            //this.loadDashboardDetails(this.campaignId);
        });
    }

    public ngOnDestroy(): void {
        this.paramsSubs.unsubscribe();
    }

    public setActiveTab(event: any): void {
        this.selectedTab.tab = event.nextId;
        console.log('event=', event);
    }

}
