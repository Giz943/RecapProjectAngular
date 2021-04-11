import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Rental } from '../models/rental';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class RentalService {
  apiUrl = 'https://localhost:9829/api/';

  constructor(private httpClient: HttpClient) { }
  getRentalByCarIdControl(carId:number):Observable<ResponseModel> {
    let newPath = this.apiUrl + "rentals/getRentalByCarIdControl?carId="+carId
    return this.httpClient.get<ResponseModel>(newPath);
  }
  add(rental:Rental):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"rentals/add",rental)
  }
}
