import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Campaign } from '../../_models';
import { User } from '../../_models';

@Injectable()
export class SearchService {
    constructor(private http: HttpClient) { }

    getCompanies() {
        return this.http.get<Campaign[]>(`/getCompanies`);
    }

    getContacts() {
        return this.http.get<User[]>(`/getContacts`);
    }
}