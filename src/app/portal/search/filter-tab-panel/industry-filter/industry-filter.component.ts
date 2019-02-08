import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'industry-filter',
  templateUrl: './industry-filter.component.html',
  styleUrls: ['./industry-filter.component.css']
})
export class IndustryFilterComponent implements OnInit {
  constructor(private formBuilder: FormBuilder) { 
    this.form = this.formBuilder.group({
        industry: null
    });
  }
  form: FormGroup;
  @Input() public hideFilter:boolean;
  public itemsLeft:Object[];
  public itemsRight:Object[];
  public type:string;
  public label:string;
  @Input() public masterForm:any;
  @Input() public reset:boolean;
  @Output() public formSubmit: EventEmitter<any> = new EventEmitter<any>();

  ngOnInit() {
    this.hideFilter = false;
    this.itemsRight=[];
    this.itemsLeft = [
      {'name':'Agriculture', 'id':1 },
      {'name':'Sports', 'id' : 2 },
      {'name':'Textiles', 'id' : 3 },
      {'name':'Mining', 'id':4 },
      {'name':'Construction', 'id':5 },
      {'name':'Education Services', 'id':6 },
      {'name':'HealthCare', 'id' : 7 },
      {'name':'Manufacturing', 'id' : 8 },
      {'name':'Softwares', 'id' : 9 }
    ];

    this.type="list";
    this.label="Industries";

    this.form.valueChanges
      .subscribe((form) => {
          //console.log('form value for industry', form.industry);
          this.formSubmit.emit({data: form.industry, filter: 'industry'});
    });

    return;
  }

  ngOnChanges(changes: SimpleChanges): void {
      if ('reset' in changes && this.reset) {
        this.form.reset();
      }
      console.log('ng on changes in industry', changes);
      if ('masterForm' in changes) {
          //console.log('this.masterForm=', this.masterForm);
          if (this.masterForm) {
              this.form.patchValue({
                  industry: this.masterForm.industry ? this.masterForm['industry'] : null
              });
              //this.itemsRight=this.masterForm.industry;
              //console.log('itemsRight=', this.itemsRight);
          }
      }
  }

}
