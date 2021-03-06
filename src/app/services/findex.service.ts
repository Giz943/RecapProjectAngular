import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarFindex } from '../models/carFindex';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { UserFindex } from '../models/userFindex';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class FindexService {
  constructor(
    private httpClient: HttpClient,
    private apiService: ApiService
  ) {}
  userFindexAdd(userFindex:UserFindex):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiService.ApiUrl("findexes/userFindexAdd"),userFindex)
  }
  userFindexUpdate(userFindex:UserFindex):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiService.ApiUrl("findexes/userFindexUpdate"),userFindex)
  }
  carFindexAdd(carFindex:CarFindex):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiService.ApiUrl("findexes/carFindexAdd"),carFindex)
  }
  carFindexUpdate(carFindex:CarFindex):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiService.ApiUrl("findexes/carFindexUpdate"),carFindex)
  }
  getUserCarFindex(carId:number,userId:number): Observable<ResponseModel> {
    return this.httpClient.get<ResponseModel>(
      this.apiService.ApiUrl('findexs/findexUserCarControl?carId='+carId+"&userId="+userId)
    );
  }
  getUserFindex(userId:number): Observable<SingleResponseModel<UserFindex>> {
    return this.httpClient.get<SingleResponseModel<UserFindex>>(
      this.apiService.ApiUrl('findexs/getFindexUser?userId='+userId)
    );
  }
  getCarFindex(carId:number): Observable<SingleResponseModel<CarFindex>> {
    return this.httpClient.get<SingleResponseModel<CarFindex>>(
      this.apiService.ApiUrl('findexs/getFindexCar?carId='+carId)
    );
  }
}
