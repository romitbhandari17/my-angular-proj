import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'employee-size-filter',
  templateUrl: './employee-size-filter.component.html',
  styleUrls: ['./employee-size-filter.component.css']
})
export class EmployeeSizeFilterComponent implements OnInit {

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
        employeeSize: null
    });
   }
  form: FormGroup;
  @Input() public hideFilter:boolean;
  public itemsLeft:Object[];
  public itemsRight:Object[];
  public type:string;
  public label:string;
  @Output() public formSubmit: EventEmitter<any> = new EventEmitter<any>();
  @Input() public masterForm:any;
  @Input() public reset:boolean;
  ngOnInit() {
    this.hideFilter = false;
    this.itemsRight=[];
    this.itemsLeft = [
      {'name':'0-50', 'id':1 },
      {'name':'50-100', 'id' : 2 },
      {'name':'100-500', 'id' : 3 },
      {'name':'500-2000', 'id':4 },
      {'name':'2000-10000', 'id':5 }
    ];

    this.type="box";
    this.label="Employee Size";

    this.form.valueChanges
      .subscribe((form) => {
          this.formSubmit.emit({data: form.employeeSize, filter: 'employeeSize'});
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
      if ('reset' in changes && this.reset) {
        this.form.reset();
      }

      if ('masterForm' in changes) {
          if (this.masterForm) {
              this.form.patchValue({
                  employeeSize: this.masterForm.employeeSize ? this.masterForm['employeeSize'] : null
              });
          }
      }
  }

}
