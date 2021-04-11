import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenDecord } from 'src/app/models/tokenDecord';
import { FindexService } from 'src/app/services/findex.service';
import { RentalService } from 'src/app/services/rental.service';
import { TokenDecorderService } from 'src/app/services/token-decorder.service';

@Component({
  selector: 'app-rental-control',
  templateUrl: './rental-control.component.html',
  styleUrls: ['./rental-control.component.css']
})
export class RentalControlComponent implements OnInit {
  success = false;
  error = false;
  message:string="";
  carId:number=0;
  tokenDecord:TokenDecord;
  constructor(
    private rentalService: RentalService,
    private _location: Location,
    private _router:Router,
    private activatedRoute:ActivatedRoute,
    private findexServices: FindexService,private tokenDecorderService:TokenDecorderService
  ) {}

  ngOnInit(): void {
    /** spinner starts on init */
    this.getTokenDecord();
    this.activatedRoute.params.subscribe(param=>{
      this.rentalController(param["carId"]);
      this.carId=param["carId"];
    });
   
    
  }
  getFindexControl(carId: number, userId: number) {
    this.findexServices.getUserCarFindex(carId, userId).subscribe(
      (response) => {
       
      },
      (responseError) => {
      this.message= responseError.error.message;
      
        this.error=true;
        this.success=false;
      }
    );
  }
  rentalController(carId: number) {
    this.rentalService.getRentalByCarIdControl(carId).subscribe(
      (response) => {
      
        this.getFindexControl(carId,this.tokenDecord.id)
        this.success = true;
       
      },
      (responseError) => {
     
        this.error = true;
        this.message=responseError.error.message
      }
    );
  }
  getTokenDecord(){
    this.tokenDecord=this.tokenDecorderService.tokenDecoder()
  }
  btnBack() {
    this._location.back();
  }
  btnIleri(){
    this._router.navigate(['rentals'], { queryParams: { carId:this.carId } });
  }
}
