import { Component, EventEmitter, HostListener, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'salesowner-filter',
  templateUrl: './salesowner-filter.component.html',
  styleUrls: ['./salesowner-filter.component.css']
})
export class SalesownerFilterComponent implements OnInit {

  constructor(private formBuilder: FormBuilder) { 
    this.form = this.formBuilder.group({
        salesOwner: "1",
    });
  }
  form: FormGroup;
  @Input() public hideFilter:boolean;
  @Output() public formSubmit: EventEmitter<any> = new EventEmitter<any>();
  @Input() public masterForm:any;
  @Input() public reset:boolean;
  @HostListener('document:click', ['$event'])
  public onClick(event: Event) {
      this.hideFilter=true;
  }


  ngOnInit() {
    //console.log('ngOnInit in salesowner');

    this.hideFilter = false;

    this.form.valueChanges
      .subscribe((form) => {
          this.formSubmit.emit({data: form.salesOwner, filter: 'salesOwner'});
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
      if ('reset' in changes && this.reset) {
        this.form.reset();
      }
      
      if ('masterForm' in changes) {
          if (this.masterForm) {
              this.form.patchValue({
                  salesOwner: this.masterForm.salesOwner ? this.masterForm['salesOwner'] : null
              });
          }
      }
  }

  onRadioClick(){

    //console.log('');
  }

}
