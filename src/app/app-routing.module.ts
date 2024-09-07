import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateProjectComponent } from './components/create-project/create-project.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { MyProjectsComponent } from './components/my-projects/my-projects.component';
import { RegisterComponent } from './components/register/register.component';

const routes: Routes = [
  {path:'home', component:HomeComponent},

  {path:'login', component:LoginComponent},
  {path:'register', component:RegisterComponent},
  {path:'dashboard', component:DashboardComponent},
  {path:'create-project', component:CreateProjectComponent},
  {path:'my-projects', component:MyProjectsComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full' }
  //{ path: '**', redirectTo: '/home' }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
