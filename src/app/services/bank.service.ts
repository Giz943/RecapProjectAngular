import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Bank } from '../models/bank';
import { ResponseModel } from '../models/responseModel';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class BankService {
  constructor(
    private httpClient: HttpClient,
    private apiService: ApiService
  ) {}
  verify(bank:Bank):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiService.ApiUrl("banks/getByCardVerify"),bank)
  }
}
