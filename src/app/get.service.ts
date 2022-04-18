import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetService {

  constructor(private _HttpClient:HttpClient) { }

  getTrending(type:string):Observable<any>
  {
    return this._HttpClient.get(`https://api.themoviedb.org/3/trending/${type}/week?api_key=16428d9edade8d0b9d60ded9d6a68d84`)
  }
  getGenres(type:string):Observable<any>
  {
    return this._HttpClient.get(`https://api.themoviedb.org/3/genre/${type}/list?api_key=16428d9edade8d0b9d60ded9d6a68d84&language=en-US`)
  }
  getDetails(id:number,type:string):Observable<any>
  {
    return this._HttpClient.get(`https://api.themoviedb.org/3/${type}/${id}?api_key=16428d9edade8d0b9d60ded9d6a68d84&language=en-US&append_to_response=credits,videos,similar,images&include_image_language=en,null`)
  }
  search(keyword:string):Observable<any>
  {
    return this._HttpClient.get(`https://api.themoviedb.org/3/search/multi?api_key=16428d9edade8d0b9d60ded9d6a68d84&language=en-US&query=${keyword}&page=1`)
  }
  getPersonDetails(id:number):Observable<any>
  {
    return this._HttpClient.get(`https://api.themoviedb.org/3/person/${id}?api_key=16428d9edade8d0b9d60ded9d6a68d84&language=en-US&append_to_response=movie_credits,tv_credits,images`)
  }
  getPopular(page:number = 1,type:string):Observable<any>
  {
    return this._HttpClient.get(`https://api.themoviedb.org/3/${type}/popular?api_key=16428d9edade8d0b9d60ded9d6a68d84&language=en-US&page=${page}`)
  }
}
