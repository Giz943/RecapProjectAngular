import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseModel } from '../models/responseModel';
import { UserBank } from '../models/userBank';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class BankSaveService {
  constructor(
    private httpClient: HttpClient,
    private apiService: ApiService
  ) {}
  add(bank:UserBank):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiService.ApiUrl("banks/userBankSave"),bank)
  }
}
