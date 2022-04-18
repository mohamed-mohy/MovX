import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { PrimeNGConfig } from 'primeng/api';
import { GetService } from './../get.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss'],
})
export class MoviesComponent implements OnInit {
  movies:any ={}
  originalPath : string='https://image.tmdb.org/t/p/original';
  loading: boolean = true;
  constructor(private _GetService:GetService,private _PrimeNGConfig:PrimeNGConfig,private _NgxSpinnerService:NgxSpinnerService) { }

  ngOnInit(): void {
    this._PrimeNGConfig.ripple = true;
    this.paginate()
    this.loading=true
    this._NgxSpinnerService.show()
  }
  paginate(event:any = 1) {
    this.loading=true
    this._NgxSpinnerService.show()
    if(event.page != undefined)
    {
      this._GetService.getPopular(event.page+1,'movie').subscribe((response)=>{
        this.movies =response
        if(this.loading){

          this._NgxSpinnerService.hide()
          }
      })
    }else
    {
      this.loading=true
    this._NgxSpinnerService.show()
      this._GetService.getPopular(event.page,'movie').subscribe((response)=>{
        this.movies =response
        if(this.loading){

          this._NgxSpinnerService.hide()
          }
      })
    }

    }
}
