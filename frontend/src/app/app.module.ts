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
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { TableComponent } from './table/table.component';
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import {MatLegacyButtonModule} from "@angular/material/legacy-button";
import {MatIconModule} from "@angular/material/icon";
import { MatTableExporterModule } from 'mat-table-exporter';
import { MaintainMileageComponent } from './maintain-mileage/maintain-mileage.component';
import { MaintainNewsletterComponent } from './maintain-newsletter/maintain-newsletter.component';
import {MatLegacyTooltipModule} from "@angular/material/legacy-tooltip";
import { AddRideComponent } from './add-ride/add-ride.component';
import {MatInputModule} from "@angular/material/input";
import {MatDatepickerModule} from "@angular/material/datepicker";
import { MatNativeDateModule } from '@angular/material/core';
import {NgxMatTimepickerModule} from 'ngx-mat-timepicker';
import {MatLegacyAutocompleteModule} from "@angular/material/legacy-autocomplete";
import { EditDriverPositionComponent } from './edit-driver-position/edit-driver-position.component';

const appRoutes: Routes = [
  {path: '', component: MyDriverPositionsComponent},
  {path: 'login', component: LoginComponent},
  {path: 'my-driver-positions', component: MyDriverPositionsComponent},
  {path: 'all-driver-positions', component: AllDriverPositionsComponent},
  {path: 'edit-driver-position', component: EditDriverPositionComponent},
  {path: 'add-ride', component: AddRideComponent},
  {path: 'maintain-mileage', component: MaintainMileageComponent},
  {path: 'maintain-newsletter', component: MaintainNewsletterComponent},
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
    TableComponent,
    MaintainMileageComponent,
    MaintainNewsletterComponent,
    AddRideComponent,
    EditDriverPositionComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes),
    GoogleMapsModule,
    HttpClientModule,
    FormsModule,
    MatTableModule,
    MatSortModule,
    MatLegacyButtonModule,
    MatIconModule,
    MatTableExporterModule,
    MatLegacyTooltipModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgxMatTimepickerModule,
    MatLegacyAutocompleteModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
