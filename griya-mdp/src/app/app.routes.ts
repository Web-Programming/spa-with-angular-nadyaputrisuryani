import { Routes } from '@angular/router';
import {Home as HomeComponent } from './home/home';
import { Profile } from './profile/profile';
import { Login } from './login/login';
import { Contact } from './contact/contact';
import { LokasiPerumahan } from './lokasi-perumahan/lokasi-perumahan';
export const routes: Routes = [
    {
        path :"",
        component : HomeComponent,
        title:'Home Page'
    },
    {
        path :"profile",
        component : Profile,
        //title:'Profile'
        
    },
        {
        path :"login",
        component : Login,
        //title:'Login'
        
    },
        {
        path :"contact",
        component : Contact,
        //title:'Contact'
        
    },
     {
        path :"lokasi",
        component : LokasiPerumahan,
        //title:'Lokasi '
        
    },



];
