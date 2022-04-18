import { GetService } from './../get.service';
import { Component, OnInit } from '@angular/core';
import SwiperCore, {SwiperOptions, Navigation,Autoplay ,EffectFade} from 'swiper';
import { NgxSpinnerService } from "ngx-spinner";
SwiperCore.use([Navigation,Autoplay,EffectFade]);
@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit  {

  constructor(private _GetService:GetService,private _NgxSpinnerService:NgxSpinnerService) { }
movies:any;
genres:any;
loading:boolean=true
originalPath : string='https://image.tmdb.org/t/p/original';
config: SwiperOptions = {
  slidesPerView: 1,
  effect: 'fade',
  autoHeight:true,
  fadeEffect: {
    crossFade: true
  },
};


  ngOnInit(): void {
    this.getTrending()
    this.getGenresIds()
    this._NgxSpinnerService.show()
  }
  getTrending()
{
  this.loading = true
  this._NgxSpinnerService.show()
  this._GetService.getTrending('all').subscribe((response)=>{
    this.movies =response.results.slice(10)
    this._NgxSpinnerService.show()
    if(this.loading){

        this.loading =false
        this._NgxSpinnerService.hide()
    }
  })
  }

  getGenresIds()
  {
    this._GetService.getGenres('movie').subscribe((response)=>{
      this.genres = response.genres

    })
}


}
