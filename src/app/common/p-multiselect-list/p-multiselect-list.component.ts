import { AbstractControlOptions, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ControlValueAccessor } from '@angular/forms/src/directives';
import {
    Component,
    EventEmitter,
    forwardRef,
    HostListener,
    Input,
    OnChanges,
    OnInit,
    Output,
    SimpleChanges
} from '@angular/core';

@Component({
  selector: 'app-p-multiselect-list',
  templateUrl: './p-multiselect-list.component.html',
  styleUrls: ['./p-multiselect-list.component.css'],
  providers: [
    { 
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PMultiselectListComponent),
      multi: true
    }
  ]
})
export class PMultiselectListComponent implements OnInit, OnChanges, ControlValueAccessor {

  @Input() label:String="Items";
  @Input() heightOuterDiv:number=210;
  @Input() public widthOuterDiv:number=1000;
  @Input() public type:String='box';
  @Input() public itemsLeft:Object[];
  @Input() public itemsRight:Object[];
  public hideWidget:boolean=false;

  @HostListener('document:click', ['$event'])
  public onClick(event: Event) {
      this.hideWidget=true;
  }

  public heightInnerDiv:number;
  constructor() { }

  ngOnInit() {
    this.heightInnerDiv = this.heightOuterDiv - 60;
    // this.itemsRight=[];
    // this.items = [
    //   {'name':'Agriculture', 'email' :'anil.singh581@gmail.com', 'age' :'34', 'city':'Noida, UP, India' },
    //   {'name':'Sports', 'email' :'anil.singh581@gmail.com', 'age' :'34', 'city':'Noida' },
    //   {'name':'Textiles', 'email' :'anil.singh581@gmail.com', 'age' :'34', 'city':'Noida' },
    //   {'name':'Mining', 'email' :'anil.singh581@gmail.com', 'age' :'34', 'city':'Noida' },
    //   {'name':'Construction', 'email' :'anil.singh581@gmail.com', 'age' :'34', 'city':'Noida' },
    //   {'name':'Education Services', 'email' :'anil.singh581@gmail.com', 'age' :'34', 'city':'Noida' },
    //   {'name':'HealthCare', 'email' :'anil.singh581@gmail.com', 'age' :'34', 'city':'Noida' },
    //   {'name':'Manufacturing', 'email' :'anil.singh581@gmail.com', 'age' :'34', 'city':'Noida' },
    //   {'name':'Softwares', 'email' :'anil.singh581@gmail.com', 'age' :'34', 'city':'Noida' }
    // ];
    //this.items.sort();
    //console.log('ng On Init in multiselect');
    this.setLeftItems();
  }

  ngOnChanges(changes: SimpleChanges): void {
    //console.log('ng on changes in multiselect',changes);
    this.heightInnerDiv = this.heightOuterDiv - 60;

    if ('itemsRight' in changes) {
      if (this.itemsRight) {
        this.setLeftItems();
      }
    }
  }

  public writeValue(value: any): void {

      if (!value) {
          this.itemsRight = [];
          this.setLeftItems();
          return;
      }
      this.itemsRight = value;
      this.setLeftItems();
  }

  public registerOnChange(fn: any): void {
      this.onChangeCallback = fn;
  }

  public registerOnTouched(fn: any): void {
      this.onTouchedCallback = fn;
  }

  private setLeftItems(): void {
      //this.items = this.sortOptions(this.cloneArray(this.masterOptions), this.settings.dataType);
      if (this.itemsRight.length > 0) {
          this.removeItemsRightFromItemsLeft();
      }
  }

  private removeItemsRightFromItemsLeft(): void {
      for (let option of this.itemsRight) {
          //let index: number =this.getIndex(this.items, option);
          for(let leftOption of this.itemsLeft){
            if(leftOption['name'] == option['name']){
              let index:number = this.itemsLeft.indexOf(leftOption);
              this.itemsLeft.splice(index, 1);
              break;
            }
          }
      }
  }
  
  private onTouchedCallback: () => void = () => { let x = 'x'; };
  private onChangeCallback: (_: any) => void = () => { let x = 'x'; };

  moveToRight(item){
    const index = this.itemsLeft.indexOf(item, 0);
    //console.log('index=', index);
    if (index > -1) {
      this.itemsLeft.splice(index, 1);
    }

    this.itemsRight.push(item);
    this.onChangeCallback(this.itemsRight);
    //this.itemChangeEvent.emit({itemsLeft:this.itemsLeft,itemsRight:this.itemsRight});
  }

  moveToLeft(item){
    const index = this.itemsRight.indexOf(item, 0);
    if (index > -1) {
      this.itemsRight.splice(index, 1);
    }

    this.itemsLeft.push(item);
    this.onChangeCallback(this.itemsRight);
    //this.itemChangeEvent.emit({itemsLeft:this.itemsLeft,itemsRight:this.itemsRight});
  }

  moveAllLeft(){
    for(let item of this.itemsRight){
      const index = this.itemsRight.indexOf(item, 0);

      if (index > -1) {
        this.itemsRight.splice(index, 1);
        this.itemsLeft.push(item);
      }
    }
    this.onChangeCallback(this.itemsRight);
    //this.itemChangeEvent.emit({itemsLeft:this.itemsLeft,itemsRight:this.itemsRight});
    return;
  }

  moveAllRight(itemsLeft, itemsRight){
    for(let item of itemsLeft){
      const index = itemsLeft.indexOf(item, 0);

      if (index > -1) {
        itemsLeft.splice(index, 1);
        itemsRight.push(item);
      }
    }

    this.itemsLeft=itemsLeft;
    this.itemsRight=itemsRight;
    this.onChangeCallback(this.itemsRight);
    //this.itemChangeEvent.emit({itemsLeft:this.itemsLeft,itemsRight:this.itemsRight});
    return;
  }

  sortFunction(n1,n2){
    if (n1 > n2) {
        return 1;
    }

    if (n1 < n2) {
        return -1;
    }

    return 0;
  }

}
