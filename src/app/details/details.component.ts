import { Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import { ActivatedRoute, ActivationStart, Router } from '@angular/router';
import { GetService } from '../get.service';
import SwiperCore, {SwiperOptions, Navigation,Autoplay ,EffectFade} from 'swiper';
import {MatDialog} from '@angular/material/dialog';
import { NgxSpinnerService } from "ngx-spinner";

SwiperCore.use([Navigation,Autoplay,EffectFade]);
@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class detailsComponent implements OnInit  {
  @ViewChild('PlayVideo')
  PlayVideo!: TemplateRef<any>;
  @ViewChild('viewImg')
  viewImg!: TemplateRef<any>;
  id:any
  idChanges:any
  type:any
  key:any
  img:any
  details:any ={}
  creditsArr:any
  typeChanges:any
  originalPath : string='https://image.tmdb.org/t/p/original';
  loading:boolean=true
  config: SwiperOptions = {
    breakpoints: {
      // when window width is >= 320px
      320: {
        slidesPerView: 2,
        spaceBetween: 20
      },
      // when window width is >= 480px
      480: {
        slidesPerView: 2,
        spaceBetween: 30
      },
      // when window width is >= 640px
      640: {
        slidesPerView: 2,
        spaceBetween: 40
      },
      768: {
        slidesPerView: 4,
        spaceBetween: 40
      }
    }
  };

  config1: SwiperOptions = {
    breakpoints: {
      // when window width is >= 320px
      320: {
        slidesPerView: 1,
        spaceBetween: 20
      },
      // when window width is >= 480px
      480: {
        slidesPerView: 1,
        spaceBetween: 30
      },
      // when window width is >= 640px
      640: {
        slidesPerView: 1,
        spaceBetween: 40
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 40
      },
      1200: {
        slidesPerView: 3,
        spaceBetween: 40
      }
    }
  };

  apiLoaded: Boolean =false


  constructor(private _ActivatedRoute:ActivatedRoute,private _NgxSpinnerService:NgxSpinnerService, private _GetService:GetService ,private _Router:Router ,private dialog:MatDialog) {}

  ngOnInit(): void {
    this._NgxSpinnerService.show()
    if(!this.apiLoaded) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      document.body.appendChild(tag);
      this.apiLoaded = true;
    }
    this.id = this._ActivatedRoute.snapshot.params['id']
    this.idChanges =this._ActivatedRoute.snapshot.params['id']
    this.type = this._ActivatedRoute.snapshot.params['type']
    this.typeChanges =this._ActivatedRoute.snapshot.params['type']
    if(this.type == 'movie')
    {
      this.loading = true
      this._NgxSpinnerService.show()
          this._GetService.getDetails(this.id,this.type).subscribe((response)=>{
          this.details = response
          this._NgxSpinnerService.show()
          if(this.loading){
              this._NgxSpinnerService.hide()
          }
      })

    }
    else if(this.type == 'tv')
    {
      this.loading = true
      this._NgxSpinnerService.show()
        this._GetService.getDetails(this.id,this.type).subscribe((response)=>{

          this.details = response
          this._NgxSpinnerService.show()
          if(this.loading){
              this._NgxSpinnerService.hide()
          }

      })
    }else if(this.type == 'person')
    {
      this.loading = true
      this._NgxSpinnerService.show()
      this._GetService.getPersonDetails(this.id).subscribe((response)=>{
        this.details = response

        if(this.loading){
          this._NgxSpinnerService.hide()
        }

      })
    }
    else
    {
      this._Router.navigate(['#'])

    }


    this._Router.events.subscribe((event) => {
      if (event instanceof ActivationStart) {
        this.loading = true
        this._NgxSpinnerService.show()
        this.typeChanges = event.snapshot.params['type']
        this.idChanges=event.snapshot.params['id']

        if(event.snapshot.params['type']== 'movie')
        {
        this._GetService.getDetails(event.snapshot.params['id'],event.snapshot.params['type']).subscribe((response)=>{

              this.details = response
              this._NgxSpinnerService.show()
              if(this.loading){
                  this._NgxSpinnerService.hide()
              }

          })

        }

        if(event.snapshot.params['type']== 'tv')
        {
          this._GetService.getDetails(event.snapshot.params['id'],event.snapshot.params['type']).subscribe((response)=>{

              this.details = response
              this._NgxSpinnerService.show()
              if(this.loading){
                  this._NgxSpinnerService.hide()

              }

          })

        }


        if(event.snapshot.params['type']== 'person')
        {
        this._GetService.getPersonDetails(event.snapshot.params['id']).subscribe((response)=>{

              this.details = response

              if(this.loading){
                this._NgxSpinnerService.hide()
              }
          })

        }


      }


    });




  }

  playVideo(id:string){

    this.dialog.open(this.PlayVideo)
    this.key = id+'?controls=0';
  }

  viewImage(imgPath:string)
  {
    this.dialog.open(this.viewImg)
    this.img =imgPath
  }

}
