import { Campaign } from '../../../_models';
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
  private campaignService: CampaignService,
  private router: Router) { }
  public headerArray:Object[];
  public data : Object[];
  public loading:boolean=true;
  public rowsPerPage:number;
  public recordsCount:number;
  public tableReset:boolean;
  ngOnInit() {
    this.headerArray = [{'label':'Campaign Name', 'name':'campaignName', 'colspan':'2'},
      {'label':'Description', 'name':'campaignDesc', 'colspan':'3'},
      {'label':'Industries', 'name':'industry', 'colspan':'4'},
      {'label':'Employee Size', 'name':'employeeSize', 'colspan':'2'},
      {'label':'Edit', 'name':'edit', 'colspan':'1', 'image':'Edit Image', 'action':true}
    ];
    this.loading=true;
    this.data=[];
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
   this.rowsPerPage = 3;
   this.tableReset = true;
   this.getDataTableRecords({'firstRecord':1,'rowsPerPage':this.rowsPerPage});
  }

  // goToCampaignDetails(item){
  //    this.routingService.showView('campaign-details',null,item.id,null, item.campaignName);
  // }

  goToCampaignDetails(item){
    //console.log('go to details', item);
    this.routingService.showView('campaign-details',item.campaignName, item.id,null,null);
  }

  getDataTableRecords(item){
    this.data=[];
    this.loading=true;
    this.campaignService.getAllCampaigns().pipe(first()).subscribe(campaigns => {
          //console.log('campaigns=',campaigns); 
          this.recordsCount = campaigns.length;
          let length = item.rowsPerPage+item.firstRecord-1 > campaigns.length ? campaigns.length : (item.rowsPerPage+item.firstRecord-1);
          for(let i=item.firstRecord-1; i<length; i++){
              //console.log(campaigns[i]); 
              this.data.push(campaigns[i]);
          }
          this.loading=false;
          //console.log('getDataTableRecords=', this.data);
    });
  }

  dataTableAction(event:any){
    //console.log('dataTableAction=', event);
    if(event.actionName == 'edit'){
      //this.routingService.showView('campaign-edit',null,event.item.id,null, event.item.campaignName);
      this.routingService.showView('campaign-edit',event.item.campaignName,event.item.id,null,null);
    }
  }

}
