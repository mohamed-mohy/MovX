import { LoginGuard } from './login.guard';
import { SignUpComponent } from './signUp/signUp.component';
import { SignInComponent } from './signIn/signIn.component';
import { PeopleComponent } from './people/people.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MoviesComponent } from './movies/movies.component';
import { TvComponent } from './tv/tv.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AuthGuard } from './auth.guard';
import { detailsComponent } from './details/details.component';

const routes: Routes = [
  {path:'home',canActivate:[AuthGuard],component: HomeComponent},
  {path:'movies',canActivate:[AuthGuard],component: MoviesComponent},
  {path:'tv',canActivate:[AuthGuard],component: TvComponent},
  {path:'people',canActivate:[AuthGuard],component: PeopleComponent},
  {path:'details/:type/:id',canActivate:[AuthGuard],component: detailsComponent},
  {path:'signIn',canActivate:[LoginGuard],component: SignInComponent},
  {path:'signUp',canActivate:[LoginGuard],component: SignUpComponent},
  {path:'',redirectTo:'home',pathMatch:'full'},
  {path:'**',component: NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule],
   declarations: []
})
export class AppRoutingModule { }
