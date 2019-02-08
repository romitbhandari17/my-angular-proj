import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Campaign } from '../../_models';

@Injectable()
export class CampaignService {
    constructor(private http: HttpClient) { }


    createCampaign(campaign: Campaign) {
        return this.http.post(`/campaigns/create`, campaign);
    }

    getAllCampaigns() {
        return this.http.get<Campaign[]>(`/campaigns`);
    }

    getCampaignById(id: number) {
        return this.http.get(`/campaign/` + id);
    }
}