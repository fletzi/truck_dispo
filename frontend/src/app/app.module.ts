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

const appRoutes: Routes = [
  {path: '', component: MyDriverPositionsComponent},
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
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    GoogleMapsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
