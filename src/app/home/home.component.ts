import {  Component,OnInit} from '@angular/core';
import { GetService } from '../get.service';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
movies:any
tvs:any
originalPath : string='https://image.tmdb.org/t/p/original';
loading:boolean=true
  constructor(private _GetService:GetService,private _NgxSpinnerService:NgxSpinnerService) { }

  ngOnInit(): void {
    this.getMovies()
    this.getTVs()
    this.loading =true
    this._NgxSpinnerService.show()
  }
  getMovies(){

  this._GetService.getTrending('movie').subscribe((response)=>{
    this._NgxSpinnerService.show()
    this.movies = response.results.slice(0,11)
    if(this.loading){
      this.loading =false
      this._NgxSpinnerService.hide()
      }
  })
}

getTVs(){

  this._GetService.getTrending('tv').subscribe((response)=>{
    this._NgxSpinnerService.show()
    this.tvs = response.results.slice(0,11)
    if(this.loading){
      this.loading =false
      this._NgxSpinnerService.hide()
  }

  })
}




}
