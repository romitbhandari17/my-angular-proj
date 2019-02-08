import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'search-tab-panel',
  templateUrl: './search-tab-panel.component.html',
  styleUrls: ['./search-tab-panel.component.css']
})
export class SearchTabPanelComponent implements OnInit {

    private selectedTab:String='';
    constructor() {  }
    loading:boolean=true;
    @Output() public searchResults: EventEmitter<any[]> = new EventEmitter<any[]>();
    @Output() public TabChangeClick: EventEmitter<any> = new EventEmitter<any>();
    @Output() public searchButtonClick:EventEmitter<any> = new EventEmitter<any>();

    public ngOnInit() {

    }

    public setActiveTab(event: any): void {
        this.selectedTab = event.nextId;
        //console.log('tab=', event);
        this.TabChangeClick.emit(this.selectedTab);
    }

    public onClick(e: Event, src: string): void {
        if (src === 'reset' || src === 'saveAsCampaign') {
            //e.preventDefault(); // it stops the default action of an element from happening.
            e.stopPropagation(); // it stops the bubbling of an event to parent elements, preventing any parent event handlers from being executed.
        }
        this.searchButtonClick.emit({event: e, source: src});
    }


}
