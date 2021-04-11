import { Component, OnInit } from '@angular/core';
import { TokenDecord } from 'src/app/models/tokenDecord';
import { TokenDecorderService } from 'src/app/services/token-decorder.service';

@Component({
  selector: 'app-login-navbar',
  templateUrl: './login-navbar.component.html',
  styleUrls: ['./login-navbar.component.css']
})
export class LoginNavbarComponent implements OnInit {

  token:string="";
  tokenDecord:TokenDecord;
  constructor(private tokenDecordService:TokenDecorderService) {}
 
  ngOnInit(): void {
    this.tokenGet();
    this.tokenDecorder();
  }
  tokenDecorder() {
    this.tokenDecord=this.tokenDecordService.tokenDecoder();
    console.log(this.tokenDecord)
   }
   logout() {
     localStorage.removeItem('token');
     location.reload();
   }
tokenGet(){
this.token= localStorage.getItem("token")
console.log(this.token,"token")
}

}
