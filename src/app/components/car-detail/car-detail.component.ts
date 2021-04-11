import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CarDto } from 'src/app/models/carDto';
import { CarImage } from 'src/app/models/carImage';
import { CarImageService } from 'src/app/services/car-image.service';
import { CarService } from 'src/app/services/car.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent implements OnInit {

  carDto: CarDto;
  carImages: CarImage[] = [];
  dataLoaded: boolean = false;
  constructor(
    private _router: Router,
    private activatedRoute: ActivatedRoute,
    private carService: CarService,
    private carImageService: CarImageService,private _location:Location
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((param) => {
      this.getCarDtoByCarId(param['carId']);
      this.getCarImages(param['carId']);
      console.log(param['carId']);
    });
  }
  getCarDtoByCarId(carId: number) {
    this.carService.getCarDtoByCarId(carId).subscribe((response) => {
      this.carDto = response.data;
      this.dataLoaded = true;
      console.log(this.carDto);
    });
  }
  getCarImages(carId: number) {
    this.carImageService.getCarImagesByCarId(carId).subscribe((response) => {
      this.carImages = response.data;
      this.dataLoaded = true;
      console.log(this.carImages)
    });
  }
  getCarImagesClass(carImage: CarImage) {
    if (this.carImages[0] == carImage) {
      return 'carousel-item active';
    } else {
      return 'carousel-item';
    }
  }
  btnBack()
  {
    this._location.back();
  }

}
