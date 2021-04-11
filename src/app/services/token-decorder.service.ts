import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';
import { TokenDecord } from '../models/tokenDecord';
import { LocalStrogeServiceService } from './local-stroge-service.service';
@Injectable({
  providedIn: 'root'
})
export class TokenDecorderService {
  tokenDecord: TokenDecord = { id:0,email: '', roles: [], firstNameLastName: '' };
  constructor(private localStrogeService:LocalStrogeServiceService) {}
  tokenDecoder(): TokenDecord {
  if(this.localStrogeService.getToken()){
      let decoded = Object.assign(
      {
        email: String,
        'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name': String,
        'http://schemas.microsoft.com/ws/2008/06/identity/claims/role': String,
        'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier': Number,
      },
      jwt_decode(localStorage.getItem('token'))
    );
    this.tokenDecord.id = parseInt(
      decoded[
        'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'
      ].toString()
    );
    console.log(this.tokenDecord,decoded)
    this.tokenDecord.email = decoded.email.toString();
    let roles = decoded[
      'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'
    ].toString();
    this.tokenDecord.roles = roles.split(',');
    this.tokenDecord.firstNameLastName = decoded[
      'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'
    ].toString();
  }
    return this.tokenDecord;
  }
}
