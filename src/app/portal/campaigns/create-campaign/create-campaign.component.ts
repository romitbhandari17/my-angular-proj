import { Component, OnInit } from '@angular/core';
import { Campaign } from 'src/app/_models/campaign';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AlertService } from '../../../_services';
import { CampaignService } from '../campaign.service';

@Component({
  selector: 'app-create-campaign',
  templateUrl: './create-campaign.component.html',
  styleUrls: ['./create-campaign.component.css']
})
export class CreateCampaignComponent implements OnInit {
  campaignForm: FormGroup;
  constructor(private formBuilder: FormBuilder,
        private router: Router,
        private campaignService: CampaignService,
        private alertService: AlertService) { }
  public submitted= false;
  public loading = false;

  ngOnInit() {
    this.campaignForm = this.formBuilder.group({
            campaignName: ['', Validators.required],
            campaignDesc: ['', Validators.required],
            campaignFile: ['', Validators.required],
            status: ['', Validators.required],
            industries: ['', Validators.required],
            salesOwner: ['', Validators.required],
            usOnly: ['', Validators.required]
        });
  }

  //campaign = new Campaign('campaign1', 'desc', 'C:\\fakepath\\LogoBlackAndWhiteNoText.jpeg', 2,[ "Agriculture", "Sports" ], "2", true);

  onSubmit(){
    this.loading=true;
    this.submitted = true;
    console.log(this.campaignForm.value);

    // stop here if form is invalid
    if (this.campaignForm.invalid) {
      console.log('form invalid');
      this.loading = false;
      return;
    }

    this.campaignService.createCampaign(this.campaignForm.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.alertService.success('Campaign Creation successful', true);
                    this.router.navigate(['/campaigns']);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
  }

  // convenience getter for easy access to form fields
  get f() { return this.campaignForm.controls; }
}
