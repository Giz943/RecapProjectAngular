import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Brand } from 'src/app/models/brand';
import { TokenDecord } from 'src/app/models/tokenDecord';
import { BrandService } from 'src/app/services/brand.service';
import { TokenDecorderService } from 'src/app/services/token-decorder.service';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.css'],
})
export class BrandsComponent implements OnInit {
  brands: Brand[] = [];
  buttoncolor: string;
  filterText: string;
  currentBrand:Brand;
  brandEmpty:Brand;
  tokenDecord:TokenDecord;
  constructor(private brandService: BrandService,private activatedRoute:ActivatedRoute,private _router:Router,private tokenDecorderServic:TokenDecorderService) {}

  ngOnInit(): void {
    this.getTokenDecord();
    this.getAllBrands();

  }
  getTokenDecord(){
    this.tokenDecord=this.tokenDecorderServic.tokenDecoder()
  }
  getAllBrands() {
    this.brandService.getBrands().subscribe((response) => {
      this.brands = response.data;
    });
  }
  setBrand(brand:Brand)
  {
     this.currentBrand=brand;
     this.activatedRoute.queryParams.subscribe((param) => {
        this._router.navigate(['cars/'], {
          queryParams: { colorId: param["colorId"], brandId: brand.id },
        });
    });
  }
  setAll()
  {
     this.currentBrand=this.brandEmpty;
     this.activatedRoute.queryParams.subscribe((param) => {
        this._router.navigate(['cars/'], {
          queryParams: { colorId: param["colorId"] },
        });
    });
  }
  getBtnCss() {
    this.buttoncolor = localStorage.getItem('themeColor');
    if (this.buttoncolor == 'dark') {
      return 'btn btn-light ml-1 mr-1 mb-1 mt-1';
    } else {
      return 'btn btn-dark ml-1 mr-1 mb-1 mt-1';
    }
  }
}
