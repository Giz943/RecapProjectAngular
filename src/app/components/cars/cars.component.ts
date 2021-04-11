import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Car } from 'src/app/models/car';
import { CarDto } from 'src/app/models/carDto';
import { TokenDecord } from 'src/app/models/tokenDecord';
import { CarService } from 'src/app/services/car.service';
import { TokenDecorderService } from 'src/app/services/token-decorder.service';


@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css'],
})
export class CarsComponent implements OnInit {
  cars: CarDto[] = [];
filterText:string="";
tokenDecord:TokenDecord;
  constructor(private route: ActivatedRoute, private carService: CarService,private tokenDecorderServic:TokenDecorderService) {}

  ngOnInit(): void {
    this.getTokenDecord();
    this.route.queryParams.subscribe((querParam) => {
      if (querParam['colorId'] && querParam['brandId']) {
        this.getCarsByColorIdBrandId(querParam['colorId'],querParam['brandId'])
      } else if (querParam['colorId']) {
        this.getCarsByColorId(querParam['colorId'])
      } else if (querParam['brandId']) {
      } else {
        this.getAllCars()
      }
    });
  }
  getAllCars() {
    this.carService.getCars().subscribe((response) => {
      this.cars = response.data;
      console.log(response)
    });
  }
  getCarsByColorId(colorId:number) {
    this.carService.getCarsByColorId(colorId).subscribe((response) => {
      this.cars = response.data;
    })
  }
  getCarsByBrandId(brandId:number) {
    this.carService.getCarsByBrandId(brandId).subscribe((response) => {
      this.cars = response.data
    })
  }
  getCarsByColorIdBrandId (colorId: number, brandId: number) {
    this.carService.getCarsByColorIdBrandId(colorId,brandId).subscribe(response=>{
      this.cars=response.data
    })
    
  }
  getTokenDecord(){
    this.tokenDecord=this.tokenDecorderServic.tokenDecoder()
  }
}
