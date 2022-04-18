import { SignInComponent } from './signIn/signIn.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SliderComponent } from './slider/slider.component';
import { HomeComponent } from './home/home.component';
import { MoviesComponent } from './movies/movies.component';
import { TvComponent } from './tv/tv.component';
import { PeopleComponent } from './people/people.component';
import { FooterComponent } from './footer/footer.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { SignUpComponent } from './signUp/signUp.component';
import {FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from "ngx-spinner";
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { SwiperModule } from 'swiper/angular';
import { detailsComponent } from './details/details.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { MyTimePipe } from './my-time.pipe';
import {MatTabsModule} from '@angular/material/tabs';
import {MatDialogModule} from '@angular/material/dialog';
import {YouTubePlayerModule} from '@angular/youtube-player';
import {PaginatorModule} from 'primeng/paginator';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SliderComponent,
    HomeComponent,
    MoviesComponent,
    TvComponent,
    PeopleComponent,
    FooterComponent,
    NotFoundComponent,
    SignInComponent,
    SignUpComponent,
    detailsComponent,
    MyTimePipe,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgxSpinnerModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    SwiperModule,
    MatAutocompleteModule,
    MatTabsModule,
    MatDialogModule,
    YouTubePlayerModule,
    PaginatorModule,


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
