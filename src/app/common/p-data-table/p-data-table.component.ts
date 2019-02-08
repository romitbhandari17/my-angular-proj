import {
    Component,
    ElementRef,
    EventEmitter,
    Input,
    OnChanges,
    OnInit,
    Output,
    SimpleChanges,
    ViewChild
} from '@angular/core';

@Component({
  selector: 'app-p-data-table',
  templateUrl: './p-data-table.component.html',
  styleUrls: ['./p-data-table.component.css']
})
export class PDataTableComponent implements OnInit, OnChanges {

  @Input() public rowsPerPage:number=3;
  @Input() public recordsCount:number;
  @Input() public loading:boolean;
  @Input() public headerArray:[];
  @Input() public data:[];
  @Output() public pageChangeClick:EventEmitter<any> = new EventEmitter<any>();
  @Output() public goToDetailsClick:EventEmitter<any> = new EventEmitter<any>();
  @Output() public clickActionEvent:EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('divOuter') public divOuter:ElementRef;
  @ViewChild('tableHead') public tableHead:ElementRef;
  firstRecord:number;
  lastRecord:number;
  totalPages:number;
  private selectPage:number=1;
  @Input() public tableReset:boolean;
  constructor() { }

  ngOnInit(){
    //console.log('ngOnInit');
  }

  ngOnChanges(changes:SimpleChanges) {

    if( this.recordsCount != undefined && this.tableReset){
      this.totalPages = Math.ceil(this.recordsCount/this.rowsPerPage);
      this.tableReset = false;
      let pageNumber = 1;
      this.firstRecord = (pageNumber-1)*this.rowsPerPage + 1;
      this.lastRecord = this.recordsCount > (pageNumber)*this.rowsPerPage ? (pageNumber)*this.rowsPerPage: this.recordsCount;
    }
    
  }

  range = (value) => { 
    let a = []; for(let i = 0; i < value; ++i) { a.push(i+1) } return a; 
  }

  showString(item){
    if (typeof(item) == "object"){
      let displayString = "";
      for(let i in item){
        displayString.concat(i+',');
      }
      return displayString;
    }else{
      return item;
    }
  }

  pageChange(pageNumber){
    this.firstRecord = (pageNumber-1)*this.rowsPerPage + 1;
    this.lastRecord = this.recordsCount > (pageNumber)*this.rowsPerPage ? (pageNumber)*this.rowsPerPage: this.recordsCount;
    this.pageChangeClick.emit({'firstRecord':this.firstRecord,'rowsPerPage': this.rowsPerPage});
  }

  pageNext(){
    this.firstRecord = (this.selectPage*this.rowsPerPage) +1;
    this.selectPage++;
    this.lastRecord = this.recordsCount > (this.firstRecord + this.rowsPerPage-1) ? (this.firstRecord + this.rowsPerPage-1) : this.recordsCount;
    this.pageChangeClick.emit({'firstRecord':this.firstRecord,'rowsPerPage': this.rowsPerPage});
  }

  pagePrev(){
    this.firstRecord = ((this.selectPage-2)*this.rowsPerPage) + 1;
    this.selectPage--;
    this.lastRecord = this.recordsCount > (this.firstRecord + this.rowsPerPage-1) ? (this.firstRecord + this.rowsPerPage-1) : this.recordsCount;
    this.pageChangeClick.emit({'firstRecord':this.firstRecord,'rowsPerPage': this.rowsPerPage});
  }

  pageLast(){
    this.firstRecord = (Math.ceil(this.recordsCount/this.rowsPerPage) -1)*this.rowsPerPage + 1;
    this.lastRecord = this.recordsCount;
    this.selectPage = Math.ceil(this.recordsCount/this.rowsPerPage);
    this.pageChangeClick.emit({'firstRecord':this.firstRecord,'rowsPerPage': this.rowsPerPage});
  }

  pageFirst(pageNumber){
    this.firstRecord = 1;
    this.selectPage=1
    this.lastRecord = this.recordsCount > (this.firstRecord + this.rowsPerPage-1) ? (this.firstRecord + this.rowsPerPage-1) : this.recordsCount;
    this.pageChangeClick.emit({'firstRecord':this.firstRecord,'rowsPerPage': this.rowsPerPage});
  }

  goToDetails(item){
    this.goToDetailsClick.emit(item);
  }

  clickAction(item,actionName){
    this.clickActionEvent.emit({item:item,actionName:actionName});
  }

  private getScroll() {
        
        if (this.divOuter && this.tableHead) {
            let top = this.divOuter.nativeElement.scrollTop;
            let headerRows = this.tableHead.nativeElement.children;
            if (headerRows && headerRows.length > 0) {
                for (let headerRow of headerRows) {
                    let headerCells = headerRow.children;
                    if (headerCells && headerCells.length > 0) {
                        for (let headerCell of headerCells) {
                            headerCell.style.top = top + 'px';
                        }
                    }
                }
            }
        }
    }

}
