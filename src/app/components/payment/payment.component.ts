import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Bank } from 'src/app/models/bank';
import { Rental } from 'src/app/models/rental';
import { BankSaveService } from 'src/app/services/bank-save.service';
import { BankService } from 'src/app/services/bank.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  rental: Rental = {
    id: 0,
    carId: 0,
    customerId: 0,
    returnDate: null,
    rentDate: null,
  };
  kaydet: boolean = false;
  valid: boolean = false;
  bank: Bank;
  Success: boolean = false;
  message: string = '';
  carId: number;
  paymentAddForm: FormGroup;
  userAddForm: FormGroup;
  constructor(
    private activatedRoute: ActivatedRoute,
    private bankService: BankService,
    private userBankService: BankSaveService,
    private rentalService: RentalService,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private _location: Location,
    private _router:Router
  ) {}

  ngOnInit(): void {
    this.createPaymentAddForm();
    this.activatedRoute.queryParams.subscribe((queryParam) => {
      let OO = Object.create(queryParam['rental']);
      this.rental.customerId = parseInt(OO[0]);
      this.rental.carId = parseInt(OO[1]);
      this.rental.rentDate= OO[3];
      this.rental.returnDate = OO[3];
      console.log(this.rental);
    });
  }
  createPaymentAddForm() {
    this.paymentAddForm = this.formBuilder.group({
      cardNumber: [
        '',
        Validators.compose([Validators.required, Validators.minLength(16)]),
      ],
      nameAndSurname: [
        '',
        Validators.compose([Validators.required, Validators.minLength(5)]),
      ],
      cvv: [
        '',
        Validators.compose([Validators.required, Validators.minLength(3)]),
      ],
      expirationDate: [
        '',
        Validators.compose([Validators.required, Validators.minLength(4)]),
      ],
    });
  }
  createUserAddForm() {
    this.userAddForm = this.formBuilder.group({
      userId: [this.rental.customerId],
      cardNumber: [
        this.paymentAddForm.controls.cardNumber.value,
        Validators.compose([Validators.required]),
      ],
      nameAndSurname: [
        this.paymentAddForm.controls.nameAndSurname.value,
        Validators.compose([Validators.required]),
      ],
      cvv: [
        this.paymentAddForm.controls.cvv.value,
        Validators.compose([Validators.required]),
      ],
      expirationDate: [
        this.paymentAddForm.controls.expirationDate.value,
        Validators.compose([Validators.required]),
      ],
    });
  }
  btnBack() {
    this._location.back();
  }
  btnOdemeYap() {
    var cardNumber: string = this.paymentAddForm.value.cardNumber;
    for (let index = 0; index < 3; index++) {
      cardNumber = cardNumber.replace('-', '');
    }
    this.paymentAddForm.value.cardNumber = cardNumber;
    this.paymentAddForm.value.cvv = parseInt(this.paymentAddForm.value.cvv);
    if (this.paymentAddForm.valid) {
      this.valid = true;
      let colorModel = Object.assign({}, this.paymentAddForm.value);
      this.bankService.verify(colorModel).subscribe(
        (response) => {
          this.Success = true;
          this.createUserAddForm();
        },
        (responseError) => {
          this.message = responseError.error.message;
          this.Success = false;
        }
      );
    } else {
      this.message = 'Tüm alanları doldurunuz!';
    }
  }

  btnKirala() {
    let rentalModel = Object.assign({}, this.rental);
    this.userAddForm.value.cvv = parseInt(this.userAddForm.value.cvv);
    var cardNumber: string = this.userAddForm.value.cardNumber;
    for (let index = 0; index < 3; index++) {
      cardNumber = cardNumber.replace('-', '');
    }
    this.userAddForm.value.cardNumber = cardNumber;
    this.rentalService.add(rentalModel).subscribe((response) => {
      if (this.kaydet == true) {
        let userBankModel = Object.assign({}, this.userAddForm.value);
        this.userBankService.add(userBankModel).subscribe(
          (response) => {
            this.toastrService.success(response.message)
            this._router.navigate(['cars/'], {
              queryParams: { },
            });
          },
          (responseError) => {
           this.toastrService.error(responseError.error.message)
           this._router.navigate(['cars/'], {
            queryParams: { },
          });
          }
        );
      }
      this.toastrService.success(response.message)
      this._router.navigate(['cars/'], {
        queryParams: { },
      });
    },
    responseError=>{
      this.toastrService.error(responseError.error.message)
      this._router.navigate(['cars/'], {
        queryParams: { },
      });
    }
    );
  }

}
