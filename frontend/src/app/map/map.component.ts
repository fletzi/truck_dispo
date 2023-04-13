import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { format } from 'date-fns';
import { AlertService } from "../alert.service";
import { InfocardsService } from "../infocards.service";

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {


  isLoading = false;
  // @ts-ignore
  map: google.maps.Map;
  // @ts-ignore
  currentInfoWindow: google.maps.InfoWindow = null;
  markers: google.maps.Marker[] = [];


  constructor(private http: HttpClient, private alertService: AlertService, private infocardsService: InfocardsService) {}

  myDate: Date = new Date();
  drivers: any[] = [];

  async getAllDrivers(): Promise<void> {
    let formattedDate = format(this.myDate, 'yyyy-MM-dd');
    // https://cors-anywhere.herokuapp.com/ - Proxy for dev purposes
    let url = `https://cors-anywhere.herokuapp.com/https://dispodev.ew.r.appspot.com/api/dispo/getAllDrivers/${formattedDate}`;
    let token = sessionStorage.getItem('jwt');
    try {
      const data: any = await this.http.get(url, {
        headers: new HttpHeaders(
          {
            'Authorization': 'Bearer ' + token,
            'Accept': '*/*',
            'Content-Type': 'application/json'
          }),}).toPromise();
      this.drivers = data;
      console.log(this.drivers);
      if (data.length == 1) {
        this.alertService.setMessage(data.length + " driver position has been updated.");
      }
      else {
        this.alertService.setMessage(data.length + " driver positions have been updated.");
      }
      this.alertService.setCode(200); // Hier setzen wir den errorCode auf den Standardwert 200 für eine erfolgreiche Anfrage
    } catch (error) {
      console.error('HTTP Request was not successful', error);
      // @ts-ignore
      if (error.status == 400) {
        this.alertService.setMessage("There are no driver positions for the date you selected.");
      }
      else {
        // @ts-ignore
        this.alertService.setMessage(error.statusText + " - Error: " + error.status);
      }
      // @ts-ignore
      this.alertService.setCode(error.status);
    }
  }

  increaseDate() {
    const newDate = new Date(this.myDate);
    newDate.setDate(newDate.getDate() + 1);
    this.myDate = newDate;
    this.initMap();
  }

  decreaseDate() {
    const newDate = new Date(this.myDate);
    newDate.setDate(newDate.getDate() - 1);
    this.myDate = newDate;
    this.initMap();
  }

  // Initializes the Google Maps "Map" after this component is initialized
  ngOnInit() {
    this.initMap();
  }

  // Initialisiert die Google Maps "Map"
  async initMap(): Promise<void>{
    this.map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
      center: {lat: 39, lng: -101.299591}, // set map center to the center of the USA
      zoom: 4, // set the initial zoom to 4
      disableDefaultUI: true, // disables all default map controls
      zoomControl: true, // enables zoom controls
      mapTypeId: 'hybrid', // sets the map type to satellite image with descriptive elements
      fullscreenControl: true // enables fullscreen controls
    });

    // adds markers to all addresses given to the function
    this.isLoading = true;

    await this.getAllDrivers();

    this.addMarkersToMap().finally(() => {
      this.isLoading = false;
    });
  }

  private geocoder = new google.maps.Geocoder();

// gets the latitude and longitude of a given address string - uses the Google geocoder api
  getLatLngFromAddress(address: string): Promise<google.maps.LatLng> {
    // check if result is cached
    if (this.cache[address]) {
      return Promise.resolve(this.cache[address]);
    }
    return new Promise((resolve, reject) => {
      // set initial delay
      let delay = 0;
      this.geocoder.geocode({address: address}, (results, status) => {
        if (status === google.maps.GeocoderStatus.OK) {
          if (results) {
            // cache result
            this.cache[address] = results[0].geometry.location;
            resolve(results[0].geometry.location);
          }
        } else if (status === google.maps.GeocoderStatus.OVER_QUERY_LIMIT) {
          // add delay if over query limit
          delay += 500;
          setTimeout(() => {
            this.getLatLngFromAddress(address).then(resolve).catch(reject);
          }, delay);
        } else {
          reject(`Geocoding failed: ${status}`);
        }
      });
    });
  }

// cache object
  cache: {[address: string]: google.maps.LatLng} = {};

  async addMarkersToMap(): Promise<void> {
    // Remove existing markers from the map
    this.markers?.forEach(marker => marker.setMap(null));
    this.markers = [];

    try {
      for (const driver of this.drivers) {
        const latLng = await this.getLatLngFromAddress(driver.address);
        const marker = new google.maps.Marker({
          position: latLng,
          map: this.map,
          title: driver.firstName + " " + driver.lastName,
        });

        this.markers.push(marker);

        let statusString: string = "";
        const deliveryDate = new Date(driver.deliveryTime);
        const deliveryTimeFormatted = deliveryDate.toLocaleString('en-US', {month: '2-digit', day: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit'});


        if (driver.status == "green") {
          statusString = "available"
        } else if (driver.status == "yellow") {
          statusString = "unavailable"
        } else if (driver.status == "blue") {
          statusString = "vacation"
        } else {
          statusString = "unknown"
        }

        let driverName: string = driver.firstName +' '+ driver.lastName;

        const contentString =
          '<div class="map-info">\n' +
          '  <span>'+ driverName +'</span>\n' +
          '  <table class="table">\n' +
          '    <thead>\n' +
          '    <tr>\n' +
          '      <th scope="col">Location:</th>\n' +
          '      <td>'+ driver.address +'</td>\n' +
          '    </tr>\n' +
          '    </thead>\n' +
          '    <tbody>\n' +
          '    <tr>\n' +
          '      <th scope="row">Clearing Time:</th>\n' +
          '      <td>'+ deliveryTimeFormatted +'</td>\n' +
          '    </tr>\n' +
          '    <tr>\n' +
          '      <th scope="row">Status:</th>\n' +
          '      <td>'+ statusString +'</td>\n' +
          '    </tr>\n' +
          '    <tr>\n' +
          '      <th scope="row">Truck:</th>\n' +
          '      <td>'+ driver.truckVIN +'</td>\n' +
          '    </tr>\n' +
          '    <tr>\n' +
          '      <th scope="row">Trailer:</th>\n' +
          '      <td>'+ driver.trailerVIN +'</td>\n' +
          '    </tr>\n' +
          '    </tbody>\n' +
          '  </table>\n' +
          '\n' +
          '</div>';

        const infowindow = new google.maps.InfoWindow({
          content: contentString,
        });

        marker.addListener("click", () => {
          if (this.currentInfoWindow) {
            this.currentInfoWindow.close();
          }
          infowindow.open(this.map, marker);
          this.currentInfoWindow = infowindow;
          this.infocardsService.setDetails(driver.firstName + " " + driver.lastName, driver.address, statusString, deliveryTimeFormatted, driver.truckVIN, driver.rideNumber.toString(), driver.trailerVIN);

          //add code for selection of drive in table / view on side panel
        });
      }
    } catch (error) {
      this.alertService.setMessage("An error occurred while adding markers to the map");
      console.log(error);
    }
  }


}
