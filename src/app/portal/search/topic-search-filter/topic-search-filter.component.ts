import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'topic-search-filter',
  templateUrl: './topic-search-filter.component.html',
  styleUrls: ['./topic-search-filter.component.css']
})
export class TopicSearchFilterComponent implements OnInit {

  constructor() { }

  @Output() public topicSearchOnLoad:EventEmitter<any> = new EventEmitter<any>();

  @ViewChild('divTopicSearch') divTopicSearch: ElementRef;
  
  ngOnInit() {
    //alert('topic search filter height!!, window height='+ window.innerHeight);
    //alert(window.innerHeight)
    this.topicSearchOnLoad.emit(this.divTopicSearch.nativeElement.offsetHeight);

  }

}
