import { SaveAsCampaignComponent } from './save-as-campaign/save-as-campaign.component';
import { RoutingService } from '../../_services/routing.service';
import { CampaignService } from '../campaigns/campaign.service';
import {
    AfterViewChecked,
    AfterViewInit,
    Component,
    ElementRef,
    HostListener,
    Input,
    OnInit,
    ViewChild
} from '@angular/core';
import { SearchService } from './search.service';
import { first } from 'rxjs/operators';
import { PModal } from '../../common/p-modal/p-modal.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from 'src/app/_services';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  constructor(private searchService: SearchService,
              private campaignService:CampaignService,
              private formBuilder: FormBuilder,
              private alertService: AlertService,
              private router: Router,private activatedRoute: ActivatedRoute,
              private routingService: RoutingService,) { }
  public loadingSearchResults:boolean = false;
  public searchResults:any;
  public loading:boolean=false;
  public hideFilterTab:boolean;
  public resetFilter:boolean;
  public headerArray:any[];
  public recordsCount:number;
  private rowsPerPage:number=4;
  private selectedTab:String;
  public tableReset:boolean=true;
  public showResults:boolean =false;
  public showSaveAsCampaign:boolean=false;
  private paramsSubs: any;
  public masterForm: any;
  @ViewChild('pmodal')  // @ViewChild(PModal), This will also work
  private pModal:PModal;
  @ViewChild('saveCampaign') 
  private saveCampaign:SaveAsCampaignComponent;

//   @ViewChild('button1') 
//   private button:ElementRef;
  form: FormGroup;
  ngOnInit() {
      this.form = this.formBuilder.group({
        id: null,
        industry: null,
        campaignName: null,
        campaignDesc: null,
        salesOwner: null,
        status: null,
        employeeSize: null
      });
      
      if(this.router.url.includes('search/edit')){

        this.loading=true;
        this.paramsSubs = this.activatedRoute.params
        .subscribe((params) => {
            this.getSearchDetailsById(+params['id']);
            //console.log('edit campaign in search');
        });
      }

      //this.setContainerHeight();
      // setTimeout(() => {
      //     this.setContainerHeight();
      // }, 2000); 
      
  }

  ngOnChanges(){
  }

  public tabClicked(selectedTab){
    //console.log('selectedTab=', selectedTab);
    this.selectedTab = selectedTab;
    this.tableReset = false;
    this.getSearchResultsRecords({'firstRecord':1,'rowsPerPage':this.rowsPerPage,'tableReset':true});
  }

  public SearchPanelButtonClick(event: any): void {
    //console.log('SearchPanelButtonClick event', event)
      if (event.source === 'filter') {
          this.hideFilterTab = !this.hideFilterTab;
      } 
      else if (event.source === 'reset') {
          this.resetFilter = false;
          setTimeout(() => {
              this.resetFilter = true;
          });
      }
      else if(event.source === 'save'){
          //console.log('in search component');
          this.pModal.modalBody = "This is body from Parent";
          this.pModal.modalTitle = "This is Title from Parent";
          this.pModal.openBackDropCustomClass(this.pModal.modalContent);
          //console.log(this.pModal);
      }
      else if(event.source === 'saveAsCampaign'){
          this.showSaveAsCampaign =true;
          this.saveCampaign.showSaveAsCampaign = true;
          //console.log('save as Campaign button click');
      }
  }

  hideDialog(event:any){
    this.showSaveAsCampaign=false;
  }

  getSearchResultsRecords(item){
    this.searchResults=[];
    this.loading=true;
    if( this.selectedTab == 'Companies' ){
          this.showResults = true;
          this.searchService.getCompanies().pipe(first()).subscribe(companies => { 
          this.recordsCount = companies.length;
        //   this.headerArray = [{'label':'Campaign Name', 'name':'campaignName', 'colspan':'3'},
        //     {'label':'Description', 'name':'campaignDesc', 'colspan':'4'},
        //     {'label':'Industries', 'name':'industries', 'colspan':'3'},
        //     {'label':'SalesOwner', 'name':'salesOwner', 'colspan':'2'}
        //   ]; 
          this.headerArray = [{'label':'Campaign Name', 'name':'campaignName', 'colspan':'2'},
            {'label':'Description', 'name':'campaignDesc', 'colspan':'3'},
            {'label':'Industries', 'name':'industry', 'colspan':'4'},
            {'label':'Employee Size', 'name':'employeeSize', 'colspan':'2'},
            {'label':'Edit', 'name':'edit', 'colspan':'1', 'image':'Edit Image', 'action':true}
            ];
          let length = item.rowsPerPage+item.firstRecord-1 > companies.length ? companies.length : (item.rowsPerPage+item.firstRecord-1);
          for(let i=item.firstRecord-1; i<length; i++){
              //console.log(campaigns[i]); 
              this.searchResults.push(companies[i]);
          }
          
          //console.log('item.tableReset=',item.tableReset );
          if( item.tableReset == true  ){
            this.tableReset = true;
          }else{
            this.tableReset = false;
          }
          this.loading=false;
          //console.log('companies=', this.searchResults);
        });
    }else if( this.selectedTab == 'Contacts' ){
          this.showResults = true;
          this.searchService.getContacts().pipe(first()).subscribe(contacts => { 
          this.recordsCount = contacts.length;
          this.headerArray = [{'label':'User Name', 'name':'username', 'colspan':'4'},
            {'label':'last Name', 'name':'lastName', 'colspan':'4'},
            {'label':'First Name', 'name':'firstName', 'colspan':'4'}
          ]; 
          let length = item.rowsPerPage+item.firstRecord-1 > contacts.length ? contacts.length : (item.rowsPerPage+item.firstRecord-1);
          for(let i=item.firstRecord-1; i<length; i++){
              //console.log(campaigns[i]); 
              this.searchResults.push(contacts[i]);
          }
          
          //console.log('item.tableReset=',item.tableReset );
          if( item.tableReset == true  ){
            this.tableReset = true;
          }else{
            this.tableReset = false;
          }
          this.loading=false;
          //console.log('contacts=', this.searchResults);
        });
    }
    
  }

  public onFilterDataForm(event: any): void {
      if (event && event.filter) {
          this.form.controls[event.filter].setValue(event.data);
      }
  }

  onSubmit(){
    // stop here if form is invalid
    if (this.form.invalid) {
      //console.log('form invalid');
      this.loading = false;
      return;
    }

    //console.log('form object=',this.form);

    //return;

    this.campaignService.createCampaign(this.form.value)
        .pipe(first())
        .subscribe(
        data => {
            this.alertService.success('Campaign Creation successful', true);
            this.router.navigate(['/campaigns']);
        },
        error => {
            this.alertService.error(error);
            this.loading = false;
        });
  }

  getSearchDetailsById(orderId){
     this.campaignService.getCampaignById(orderId)
        .pipe(first())
        .subscribe(campaign => {
            this.loading = false;
            this.masterForm=campaign;
            //console.log('campaign details in edit=',campaign);
            this.setForm();
        },
        error => {
            this.alertService.error(error);
            this.loading = false;
        });   
  }

  private setForm(){
            if (this.masterForm) {
            this.form.patchValue({
                id: this.masterForm.id,
                campaignDesc: this.masterForm.campaignDesc,
                campaignName: this.masterForm.campaignName,
                employeeSize: this.masterForm.employeeSize,
                industry: this.masterForm.industry,
                salesOwner: this.masterForm.salesOwner,
                status: this.masterForm.status
            });
        } else {
            this.form.patchValue({
                id: null,
                industry: null,
                campaignName: null,
                campaignDesc: null,
                salesOwner: null,
                status: null,
                employeeSize: null
            });
        }
  }

  goToCampaignDetails(item){
    //console.log('go to details', item);
    this.routingService.showView('campaign-details',item.campaignName, item.id,null,null);
  }

  dataTableAction(event:any){
    //console.log('dataTableAction=', event);
    if(event.actionName == 'edit'){
      //this.routingService.showView('campaign-edit',null,event.item.id,null, event.item.campaignName);
      this.routingService.showView('campaign-edit',event.item.campaignName,event.item.id,null,null);
    }
  }



  // setContainerHeight(){
  //   if(this.topicSearchFilter){
  //     alert('topic search height='+this.topicSearchFilter.nativeElement.offsetHeight)
  //   }
    
  // }

  getTopicSearchDetails(topicSearchHeight){
    //alert('topic search height in parent='+topicSearchHeight)
  }
}
