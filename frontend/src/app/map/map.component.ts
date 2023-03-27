import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import { format } from 'date-fns';

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
  errorMessage: any;
  // @ts-ignore
  errorCode: number;


  constructor(private http: HttpClient) {
  }

  myDate: Date = new Date();
  drivers: any[] = [];

  getAllDrivers() {
    let formattedDate = format(this.myDate, 'yyyy-MM-dd');
    // https://cors-anywhere.herokuapp.com/ - Proxy for dev purposes
    let url = `https://cors-anywhere.herokuapp.com/https://dispodev.ew.r.appspot.com/dispo/getAllDrivers/${formattedDate}`;
    this.http.get(url).subscribe(
      (data: any) => {
        this.drivers = data;
        if (data.length == 1) {
          this.errorMessage = data.length + " driver position has been updated.";
        }
        else {
          this.errorMessage = data.length + " driver positions have been updated."
        }
        this.errorCode = 200; // Hier setzen wir den errorCode auf den Standardwert 200 für eine erfolgreiche Anfrage
        setTimeout(() => {
          this.errorMessage = null; // Hier setzen wir das errorMessage auf null, um es auszublenden
        }, 10000); // 10000 Millisekunden entsprechen 10 Sekunden
      },
      (error: HttpErrorResponse) => {
        console.error('HTTP Request was not successful', error);
        if (error.status == 400) {
          this.errorMessage = "There are no driver positions for the date you selected.";
        }
        else {
          this.errorMessage = error.error.message + " Code: " + error.status;
        }
        this.errorCode = error.status;
        setTimeout(() => {
          this.errorMessage = null; // Hier setzen wir das errorMessage auf null, um es auszublenden
        }, 10000); // 10000 Millisekunden entsprechen 10 Sekunden
      }
    );
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
  initMap(): void {
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

  addressList = [
    "Chicago, USA",
    "New York, USA",
    "Melbourne FL, USA",
    "Edinburgh IN, USA",
    "San Francisco, USA",
    "Las Vegas, USA",
    "Washington DC, USA",
    "Seattle, USA",
    "Miami, USA"
  ];

  // adds markers to all addresses given to the function
  // @ts-ignore
  addMarkersToMap(): Promise<void | Awaited<void>[]> {
    // Remove existing markers from the map
    this.markers?.forEach(marker => marker.setMap(null));
    this.markers = [];

    this.getAllDrivers();

    return Promise.all(this.addressList.map(address => {
      return this.getLatLngFromAddress(address).then(latLng => {
        const marker = new google.maps.Marker({
          position: latLng,
          map: this.map,
          title: address,
          animation: google.maps.Animation.DROP,
        });
        const infoWindow = new google.maps.InfoWindow({
          content: '<div class="map-info">\n' +
            '  <span>Driver Name</span>\n' +
            '  <table class="table">\n' +
            '    <thead>\n' +
            '    <tr>\n' +
            '      <th scope="col">Location:</th>\n' +
            '      <td>location</td>\n' +
            '    </tr>\n' +
            '    </thead>\n' +
            '    <tbody>\n' +
            '    <tr>\n' +
            '      <th scope="row">Status:</th>\n' +
            '      <td>status</td>\n' +
            '    </tr>\n' +
            '    <tr>\n' +
            '      <th scope="row">Truck:</th>\n' +
            '      <td>truck</td>\n' +
            '    </tr>\n' +
            '    <tr>\n' +
            '      <th scope="row">Trailer:</th>\n' +
            '      <td>trailer</td>\n' +
            '    </tr>\n' +
            '    </tbody>\n' +
            '  </table>\n' +
            '\n' +
            '</div>'
        });
        marker.addListener('click', () => {
          if (this.currentInfoWindow) {
            this.currentInfoWindow.close();
          }
          this.currentInfoWindow = infoWindow;
          infoWindow.open(this.map, marker);
        });
        // Add the marker to the array of markers
        this.markers.push(marker);
      });
    }));
  }
}
