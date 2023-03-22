import {Component, OnInit} from '@angular/core';

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

  constructor() {
  }

  myDate: Date = new Date();

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
