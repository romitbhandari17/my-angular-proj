import { RoutingService } from '../../_services/routing.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router, ParamMap } from '@angular/router';
import { User } from '../../_models';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor(private router: Router, private route:ActivatedRoute, private routingService: RoutingService) { }
  currentUser: User;
  showDropDown:boolean=false;
  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  createCampaign(){
    this.routingService.showView('campaign-create');
  }

  showHideDropDown(){
    if(this.showDropDown === false)
      this.showDropDown=true;
    else{
      this.showDropDown=false;
    }
  }

  showSearch(){
    this.routingService.showView('search');
  }

}
