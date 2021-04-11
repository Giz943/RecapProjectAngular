import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Color } from 'src/app/models/color';
import { TokenDecord } from 'src/app/models/tokenDecord';
import { ColorService } from 'src/app/services/color.service';
import { TokenDecorderService } from 'src/app/services/token-decorder.service';

@Component({
  selector: 'app-colors',
  templateUrl: './colors.component.html',
  styleUrls: ['./colors.component.css'],
})
export class ColorsComponent implements OnInit {
  buttonColor: string;
  colors: Color[] = [];
  filterText:string;
  currentColor:Color;
  colorEmpty:Color;
  tokenDecord:TokenDecord;
  constructor(private colorService: ColorService,private activatedRoute:ActivatedRoute,private _router:Router,private tokenDecorderServic:TokenDecorderService) {}

  ngOnInit(): void {
    this.getTokenDecord()
    this.getColors();
  }
  getTokenDecord(){
    this.tokenDecord=this.tokenDecorderServic.tokenDecoder()
  }
  getColors() {
    this.colorService.getColors().subscribe((response) => {
      this.colors = response.data;
    });
  }
  setAll() {
    this.currentColor = this.colorEmpty;
    this.activatedRoute.queryParams.subscribe((param) => {
      this._router.navigate(['cars/'], {
        queryParams: { brandId: param["brandId"] },
      });
  });
  }
  setColor(color: Color) {
    this.currentColor = color;
    this.activatedRoute.queryParams.subscribe((param) => {
        this._router.navigate(['cars/'], {
          queryParams: { colorId: color.id, brandId: param['brandId'] },
        });
    });
  }
  getBtnCss() {
    this.buttonColor = localStorage.getItem('themeColor');
    if (this.buttonColor == 'dark') {
      return 'btn btn-light ml-1 mr-1';
    } else {
      return 'btn btn-dark ml-1 mr-1';
    }
  }
}
