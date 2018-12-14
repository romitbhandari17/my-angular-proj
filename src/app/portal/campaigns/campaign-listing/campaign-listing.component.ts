import { Component, OnInit } from '@angular/core';
import { RoutingService } from 'src/app/_services/routing.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CampaignService } from '../campaign.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-campaign-listing',
  templateUrl: './campaign-listing.component.html',
  styleUrls: ['./campaign-listing.component.css']
})
export class CampaignListingComponent implements OnInit {

  constructor(private routingService: RoutingService,
  private campaignService: CampaignService) { }
  public header:any;
  public data : any;
  public loading:boolean=true;
  private rowsPerPage:number;
  ngOnInit() {
    this.header = [{'label':'Campaign Name', 'name':'campaignName', 'width':'20%'},
      {'label':'Description', 'name':'campaignDesc', 'width':'40%'},
      {'label':'Industries', 'name':'industries', 'width':'20%'},
      {'label':'SalesOwner', 'name':'salesowner', 'width':'20%'}
    ];
    /*this.data = [
    {'name':'Sunil', 'email' :'anil.singh581@gmail.com', 'age' :'34', 'city':'Noida, UP, India' },
    {'name':'Anuj', 'email' :'anil.singh581@gmail.com', 'age' :'34', 'city':'Noida' },
    {'name':'Punit', 'email' :'anil.singh581@gmail.com', 'age' :'34', 'city':'Noida' },
    {'name':'Alok', 'email' :'anil.singh581@gmail.com', 'age' :'34', 'city':'Noida' },
    {'name':'Tinku', 'email' :'anil.singh581@gmail.com', 'age' :'34', 'city':'Noida' },
    {'name':'XYZ', 'email' :'anil.singh581@gmail.com', 'age' :'34', 'city':'Noida' },
    {'name':'asas', 'email' :'anil.singh581@gmail.com', 'age' :'34', 'city':'Noida' },
    {'name':'erer', 'email' :'anil.singh581@gmail.com', 'age' :'34', 'city':'Noida' },
    {'name':'jhjh', 'email' :'anil.singh581@gmail.com', 'age' :'34', 'city':'Noida' }
   ];*/
   this.rowsPerPage = 10;
   this.loadAllCampaigns();
  }

  goToCampaignDetails(item){
     //let id=2;

     this.routingService.showView('campaign-details',null,item.id,null, item.campaignName);
  }

  private loadAllCampaigns() {
      this.campaignService.getAllCampaigns().pipe(first()).subscribe(campaigns => { 
          this.data = campaigns; 
          this.loading=false;
          console.log('campaigns=', this.data);
      });
  }

}
