import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { User } from '../models/user';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private httpClient: HttpClient,private apiService:ApiService) { }

  getUserById(userId:number):Observable<SingleResponseModel<User>> {
    return this.httpClient.get<SingleResponseModel<User>>(this.apiService.ApiUrl("users/getUserId?userId="+userId));
  }
  update(user:User):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiService.ApiUrl("users/update"),user)
  }
}
