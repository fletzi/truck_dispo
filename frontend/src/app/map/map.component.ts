import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  // @ts-ignore
  map: google.maps.Map;

  constructor() { }

  // Initializes the Google Maps "Map" after this component is initialized
  ngOnInit() {
    this.initMap();
  }

  // Initialisiert die Google Maps "Map"
  initMap(): void {
    this.map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
      center: { lat: 39, lng: -101.299591 }, // set map center to the center of the USA
      zoom: 4, // set the initial zoom to 4
      disableDefaultUI: true, // disables all default map controls
      zoomControl: true, // enables zoom controls
      mapTypeId: 'hybrid', // sets the map type to satellite image with descriptive elements
      fullscreenControl: true // enables fullscreen controls
    });

    // adds markers to all addresses given to the function
    this.addMarkersToMap();

  }


  private geocoder = new google.maps.Geocoder();

  // gets the latitude and longitude of a given address string - uses the Google geocoder api
  getLatLngFromAddress(address: string): Promise<google.maps.LatLng> {
    return new Promise((resolve, reject) => {
      this.geocoder.geocode({ address: address }, (results, status) => {
        if (status === google.maps.GeocoderStatus.OK) {
          if (results) {
            resolve(results[0].geometry.location);
          }
        } else {
          reject(`Geocoding failed: ${status}`);
        }
      });
    });
  }

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
  addMarkersToMap() {
    this.addressList.forEach(address => {
      this.getLatLngFromAddress(address).then(latLng => {
        const marker = new google.maps.Marker({
          position: latLng,
          map: this.map,
          title: address,
          icon: "assets/img/img2.png",
          animation: google.maps.Animation.DROP,
        });

        const infoWindow = new google.maps.InfoWindow({
          content: address
        });
        marker.addListener('click', () => {
          infoWindow.open(this.map, marker);
        });
      }).catch(error => {
        console.log(error);
      });
    });
  }

}
