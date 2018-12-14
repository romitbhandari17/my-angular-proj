import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-campaign-content',
  templateUrl: './campaign-content.component.html',
  styleUrls: ['./campaign-content.component.css']
})
export class CampaignContentComponent implements OnInit {

  @Input() public selectedTab:any;

  constructor() { }

  ngOnInit() {
    console.log('selectedTab', this.selectedTab);
  }

}
