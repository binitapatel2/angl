import { Routes } from '@angular/router';
import { FirstComponent } from './first/first.component';
import { SecondComponent } from './second/second.component';
import { FormComponent } from './form/form.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { authGuard } from './auth.guard';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
    {path:'', redirectTo:'home', pathMatch:"full"},
    // {path:'firstComponent', component:FirstComponent, canActivate:[authGuard]},
    {path:'firstComponent', component:FirstComponent},
    {path:'secondComponent', component:SecondComponent},
    {path:'form', component:FormComponent},
    {path:'home', component:HomeComponent},
    {path:'**', component:NotFoundComponent}
];
