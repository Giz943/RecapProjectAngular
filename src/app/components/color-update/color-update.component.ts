import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Color } from 'src/app/models/color';
import { ColorService } from 'src/app/services/color.service';
import { LocalStrogeServiceService } from 'src/app/services/local-stroge-service.service';

@Component({
  selector: 'app-color-update',
  templateUrl: './color-update.component.html',
  styleUrls: ['./color-update.component.css']
})
export class ColorUpdateComponent implements OnInit {

  
  colorNameLenght: number = 0;
  color: Color;
  colorUpdateForm: FormGroup;
  dataloaded: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private colorServie: ColorService,
    private localStrogeService: LocalStrogeServiceService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private _location: Location
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((param) => {
      if (param['colorId']) {
        this.getColor(param['colorId']);

      }
    });

  }

  createColorUpdateForm() {
    this.colorUpdateForm = this.formBuilder.group({
      id: [this.color.id],
      colorName: [
        this.color.colorName,
        Validators.compose([Validators.required, Validators.minLength(3)]),
      ],
    });
  }
  btnBack()
  {
    this._location.back();
  }
  getColor(colorId: number) {
    this.colorServie.getColor(colorId).subscribe(
      (response) => {
        this.color = response.data;
        this.createColorUpdateForm();
        this.dataloaded = true;
        this.colorNameLenght = this.color.colorName.length;
      
      },
    );
  }
  update() {
    if (this.getBrandValidContorol()) {
      let colorModel = Object.assign({}, this.colorUpdateForm.value);
      this.colorServie.update(colorModel).subscribe(
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
  getBrandValidContorol(): boolean {
    if (this.colorUpdateForm.valid) {
      return true;
    }    else {
      if (this.colorUpdateForm.controls.description.errors.minlength) {
        this.toastrService.error('Marka ad?? minimum 3 karakter olmal??d??r');
        return false;
      } else {
        this.toastrService.error('Marka ad?? b??l??m??n?? doldurunuz!');
        return false;
      }
    }
  }

  onChangeColorName(UpdatedValue: string): void {
    this.colorNameLenght = UpdatedValue.length;
  }

}
