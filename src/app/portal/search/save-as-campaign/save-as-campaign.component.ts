import { Component, EventEmitter, HostListener, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'save-as-campaign',
  templateUrl: './save-as-campaign.component.html',
  styleUrls: ['./save-as-campaign.component.css']
})
export class SaveAsCampaignComponent implements OnInit, OnChanges {

  form: FormGroup;
  @Input() showSaveAsCampaign:boolean;
  constructor(private formBuilder: FormBuilder){}
  @Output() public onSubmitClick:EventEmitter<any> = new EventEmitter<any>();
  @Output() public formSubmit:EventEmitter<any> = new EventEmitter<any>();
  @Output() public hideDialogClick:EventEmitter<any> = new EventEmitter<any>();
  @HostListener('document:click', ['$event'])
  public onClick(event: Event) {
      //console.log('hide save campaign');
      this.showSaveAsCampaign=false;
  }

  ngOnInit() {
        this.form = this.formBuilder.group({
            campaignName: ['', Validators.required],
            campaignDesc: ['', Validators.required]
        });

    this.form.valueChanges
      .subscribe((form) => {
          this.formSubmit.emit({data: form.campaignName, filter: 'campaignName'});
          this.formSubmit.emit({data: form.campaignDesc, filter: 'campaignDesc'});
    });
  }

  ngOnChanges(){
    //console.log('ng on changes', this.showSaveAsCampaign);
  }

  hideDialog(){
    this.hideDialogClick.emit(true);
  }

  onSubmit(){
    this.onSubmitClick.emit(true);
  }

  hideParentEvent(e: Event){
    e.stopPropagation();
  }

}
