import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from '../models/car';
import { CarDto } from '../models/carDto';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  apiUrl = 'https://localhost:9829/api/';

  constructor(private httpClient: HttpClient) { }
  getCars():Observable<ListResponseModel<CarDto>> {
    let newPath = this.apiUrl + "cars/getall"
    return this.httpClient.get<ListResponseModel<CarDto>>(newPath);
  }
  getCarsByColorId(colorId:number):Observable<ListResponseModel<CarDto>> 
  {
    let newPath = this.apiUrl + "cars/getcardetailsbycolor?colorId="+colorId
    return this.httpClient.get<ListResponseModel<CarDto>>(newPath);
  }
  getCarsByBrandId(brandId:number):Observable<ListResponseModel<CarDto>> 
  {
    let newPath = this.apiUrl + "cars/getcardetailsbybrand?brandId="+brandId
    return this.httpClient.get<ListResponseModel<CarDto>>(newPath);
  }
  getCarsByColorIdBrandId(colorId:number,brandId:number):Observable<ListResponseModel<CarDto>> 
  {
    let newPath = this.apiUrl + "cars/getcardetailsbycolorandbrand?colorId="+colorId+"&brandId="+brandId
    return this.httpClient.get<ListResponseModel<CarDto>>(newPath);
  }
  getCarDtoByCarId(carId:number):Observable<SingleResponseModel<CarDto>> {
    let newPath = this.apiUrl + "cars/getcardetailsbycar?carId="+carId
    return this.httpClient.get<SingleResponseModel<CarDto>>(newPath);
  }
  add(car:Car):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"cars/add",car)
  }
  update(car:Car):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"cars/update",car)
  }
  getCar(carId:number): Observable<SingleResponseModel<Car>> {
    return this.httpClient.get<SingleResponseModel<Car>>(
      this.apiUrl+'cars/getCar?carId='+carId
    );
  }
}

