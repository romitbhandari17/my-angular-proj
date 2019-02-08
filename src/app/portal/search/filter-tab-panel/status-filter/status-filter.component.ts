import { Component, EventEmitter, HostListener, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'status-filter',
  templateUrl: './status-filter.component.html',
  styleUrls: ['./status-filter.component.css']
})
export class StatusFilterComponent implements OnInit {

  private statusSelect:number;
  constructor(private formBuilder: FormBuilder) { 
    this.form = this.formBuilder.group({
        status:"1"
    });
  }

  form: FormGroup;
  @Input() public hideFilter:boolean;
  @Output() public formSubmit: EventEmitter<any> = new EventEmitter<any>();
  @Input() public masterForm:any;
  @Input() public reset:boolean;

  @HostListener('document:click', ['$event'])
  public onClick(event: Event) {
      //console.log('hide status filter');
      this.hideFilter=true;
  }

  ngOnInit() {
    //console.log('ngOnInit in status');  
    this.hideFilter = false;

    this.form.valueChanges
      .subscribe((form) => {
          this.formSubmit.emit({data: form.status, filter: 'status'});
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
      if ('reset' in changes && this.reset) {
        this.form.reset();
      }
      if ('masterForm' in changes) {
          if (this.masterForm) {
              this.form.patchValue({
                  status: this.masterForm.status ? this.masterForm.status : null
              });
          }
      }
  }

}
