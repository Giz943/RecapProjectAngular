import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  filterText:string;
  ngOnInit(): void {
   
  }
  title = 'RentACarProject';
  searchBarButton()
  {
    
  }
  thmeclick(color:string)
  {
   localStorage.setItem("themeColor",color);
  }
}
