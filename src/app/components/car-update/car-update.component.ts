import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { Car } from 'src/app/models/car';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';
import { LocalStrogeServiceService } from 'src/app/services/local-stroge-service.service';

@Component({
  selector: 'app-car-update',
  templateUrl: './car-update.component.html',
  styleUrls: ['./car-update.component.css']
})
export class CarUpdateComponent implements OnInit {


  descriptionLenght: number = 0;
  brands: Brand[] = [];
  colors: Color[] = [];
  car: Car;
  carUpdateForm: FormGroup;
  dataloaded: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private carService: CarService,
    private toastrService: ToastrService,
    private colorService: ColorService,
    private brandService: BrandService,
    private localStrogeService: LocalStrogeServiceService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private _location:Location
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((param) => {
      if (param['carId']) {
        this.getCar(param['carId']);
      }
    });

    this.getBrands();
    this.getColors();
  }

  createCarUpdateForm() {
    this.carUpdateForm = this.formBuilder.group({
      id: [this.car.id],
     
      brandId: [this.car.brandId, Validators.required],
      colorId: [this.car.colorId, Validators.required],
      modelYear: [this.car.modelYear, Validators.required],
      dailyPrice: [this.car.dailyPrice, Validators.required],
      description: [
        this.car.description,
        Validators.compose([Validators.required, Validators.minLength(3)]),
      ],
    });
  }
  btnBack()
  {
    this._location.back();
  }
  getCar(carId: number) {
    this.carService.getCar(carId).subscribe(
      (response) => {
        this.car = response.data;
        this.createCarUpdateForm();
        this.dataloaded = true;
      
        this.descriptionLenght = this.car.description.length;
      },
      (responseError) => {}
    );
  }
  update() {
    if (this.getCarValidContorol()) {
      let carModel = Object.assign({}, this.carUpdateForm.value);
      this.carService.update(carModel).subscribe(
        (response) => {
          this.toastrService.success(response.message, 'Ba??ar??l??');
          location.replace("/cars")
        },
        (responseError) => {
          if (responseError.error.StatusCode == 500) {
            this.localStrogeService.removeToken();

            this.toastrService.error(
              'Yetkiniz yok tekrar sisteme giri?? yapmal??s??n??z'
            );
            this.router.navigate(['login/'], {
              queryParams: {},
            });
            window.location.replace('/login');
          }
          if (responseError.error.Errors.length > 0) {
            for (let i = 0; i < responseError.error.Errors.length; i++) {
              this.toastrService.error(
                responseError.error.Errors[i].ErrorMessage,
                'Do??rulama hatas??'
              );
            }
          }
        }
      );
    }
  }
  getCarValidContorol(): boolean {
    if (this.carUpdateForm.valid) {
      return true;
    } else if (this.carUpdateForm.controls.carName.errors) {
      if (this.carUpdateForm.controls.carName.errors.minlength) {
        this.toastrService.error('Araba ad?? minimum 3 karakter olmal??d??r');
        return false;
      } else {
        this.toastrService.error('Araba ad?? b??l??m??n?? doldurunuz!');
        return false;
      }
    } else if (this.carUpdateForm.controls.brandId.errors) {
      this.toastrService.error('Marka Se??melisiniz!');
      return false;
    } else if (this.carUpdateForm.controls.colorId.errors) {
      this.toastrService.error('Renk Se??melisiniz!');
      return false;
    } else if (this.carUpdateForm.controls.modelYear.errors) {
      this.toastrService.error('Model y??l??  b??l??m??n?? doldurunuz!');
      return false;
    } else if (this.carUpdateForm.controls.dailyPrice.errors) {
      this.toastrService.error('??cret  b??l??m??n?? doldurunuz!');
      return false;
    } else {
      if (this.carUpdateForm.controls.description.errors.minlength) {
        this.toastrService.error('A????klama minimum 3 karakter olmal??d??r');
        return false;
      } else {
        this.toastrService.error('A????klama  b??l??m??n?? doldurunuz!');
        return false;
      }
    }
  }
  getBrands() {
    this.brandService.getBrands().subscribe((response) => {
      this.brands = response.data;
    });
  }
  getColors() {
    this.colorService.getColors().subscribe((response) => {
      this.colors = response.data;
    });
  }
  onChangeDescription(UpdatedValue: string): void {
    this.descriptionLenght = UpdatedValue.length;
  }

}
