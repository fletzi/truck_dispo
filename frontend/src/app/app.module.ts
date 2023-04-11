import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SubnavComponent } from './subnav/subnav.component';
import { MyDriverPositionsComponent } from './my-driver-positions/my-driver-positions.component';
import { MapComponent } from './map/map.component';
import { RouterModule, Routes} from '@angular/router';
import { AllDriverPositionsComponent } from './all-driver-positions/all-driver-positions.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { HttpClientModule } from '@angular/common/http';
import { AlertComponent } from './alert/alert.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InfocardComponent } from './infocard/infocard.component';
import { TablecontrolComponent } from './tablecontrol/tablecontrol.component';
import { LoginComponent } from './login/login.component';
import {FormsModule} from "@angular/forms";

const appRoutes: Routes = [
  {path: '', component: MyDriverPositionsComponent},
  {path: 'login', component: LoginComponent},
  {path: 'my-driver-positions', component: MyDriverPositionsComponent},
  {path: 'all-driver-positions', component: AllDriverPositionsComponent},
  {path: 'edit-driver-position', component: MapComponent},
  {path: 'add-contract', component: MapComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SubnavComponent,
    MyDriverPositionsComponent,
    MapComponent,
    AllDriverPositionsComponent,
    AlertComponent,
    InfocardComponent,
    TablecontrolComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes),
    GoogleMapsModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
