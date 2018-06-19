import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";

// ******************* imports all needs *************************
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SettingsComponent } from './components/settings/settings.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';




// ************** routes ***************
import { Router, RouterModule, Route, Routes } from "@angular/router";
// ************* fulsh messages *******************

import { FlashMessagesModule } from "angular2-flash-messages";
import { FlashMessagesService } from "angular2-flash-messages";



// firebase configuration 

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFireAuthModule } from 'angularfire2/auth'; import { environment } from '../environments/environment';

import { EmployeesComponent } from './components/employees/employees.component';
import { AddEmployeeComponent } from './components/add-employee/add-employee.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { EmployeeInfoComponent } from './components/employee-info/employee-info.component';




//************ routes ***************
const appRoutes: Routes = [
  { path: "", component: DashboardComponent },
  { path: "register", component: RegisterComponent },
  { path: "add-emp", component: AddEmployeeComponent },
  { path: "employee/:id", component: EmployeeInfoComponent },
  { path: "login", component: LoginComponent }

];


@NgModule({
  declarations: [
    AppComponent,

    LoginComponent,
    RegisterComponent,
    NavbarComponent,
    DashboardComponent,
    SettingsComponent,
    PageNotFoundComponent,
    EmployeesComponent, SidebarComponent, AddEmployeeComponent
  ],
  imports: [
    BrowserModule
    ,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule.enablePersistence(), // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    AngularFireStorageModule // imports firebase/storage only needed for storage features
    ,
    FlashMessagesModule

  ],
  providers: [
    FlashMessagesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
