import { GetService } from './../get.service';
import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss'],

})
export class PeopleComponent implements OnInit {
  people:any ={}
  originalPath : string='https://image.tmdb.org/t/p/original';
  loading:boolean = true;
  constructor(private _GetService:GetService,private _PrimeNGConfig:PrimeNGConfig,private _NgxSpinnerService:NgxSpinnerService) { }

  ngOnInit(): void {
    this._PrimeNGConfig.ripple = true;
    this.paginate()
    this.loading=true
    this._NgxSpinnerService.show()
  }


paginate(event:any = 1) {
  this.loading = true
  this._NgxSpinnerService.show()
if(event.page != undefined)
{

  this._GetService.getPopular(event.page+1,'person').subscribe((response)=>{
    this.people =response
    if(this.loading){

      this._NgxSpinnerService.hide()
      }
  })

}else
{
  this.loading =true
  this._NgxSpinnerService.show()
  this._GetService.getPopular(event.page,'person').subscribe((response)=>{
    this.people =response
    if(this.loading){
      this._NgxSpinnerService.hide()
      }
  })


}

}
}


