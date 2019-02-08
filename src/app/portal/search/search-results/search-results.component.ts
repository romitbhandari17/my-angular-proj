import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {
  @Input() public rowsPerPage:number;
  @Input() public recordsCount:number;
  @Input() public loading:boolean;
  @Input() public headerArray:[];
  @Input() public data:[];
  @Input() public tableReset:boolean;
  @Output() public pageChangeClick:EventEmitter<any> = new EventEmitter<any>();
  constructor() {}

  ngOnInit() {
    //console.log('loading in init in SearchResultsComponent=',this.loading);
  }

  ngOnChanges(){
  }

  getSearchResultsRecords(item){
    this.pageChangeClick.emit(item);
  }

}
