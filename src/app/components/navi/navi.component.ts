import { Component, OnInit } from '@angular/core';
import { TokenDecord } from 'src/app/models/tokenDecord';
import { TokenDecorderService } from 'src/app/services/token-decorder.service';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css']
})
export class NaviComponent implements OnInit {
  tokenDecord:TokenDecord;
  constructor(private tokenDecorderService:TokenDecorderService) { }

  ngOnInit(): void {
   this.getTokenDecoder()
  }
getTokenDecoder(){
 this.tokenDecord= this.tokenDecorderService.tokenDecoder();
 console.log(this.tokenDecord)
}

}
