import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor() { }
  ApiUrl(url:string){
    return 'https://localhost:9829/api/'+url
  }
  ApiImageUrl(){
    return 'https://localhost:9829/'
  }
}
