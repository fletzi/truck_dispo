import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {format} from 'date-fns';
import {AlertService} from "../alert.service";
import {InfocardsService} from "../infocards.service";
import {TableService} from "../table.service";
import {AllDriverPositionsService} from "../all-driver-positions.service";

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  url: string = "";
  showingAllDrivers: boolean = false;
  isLoading = false;
  // @ts-ignore
  map: google.maps.Map;
  // @ts-ignore
  currentInfoWindow: google.maps.InfoWindow = null;
  markers: google.maps.Marker[] = [];

  constructor(private http: HttpClient, private alertService: AlertService, private infocardsService: InfocardsService, private tableControlService: TableService, private allDriverPositionsService: AllDriverPositionsService) {
  }

  // @ts-ignore
  myDate: Date;
  formattedDate: string = "MM / DD / YY";
  drivers: any[] = [];

  /**
   * Asynchronously retrieves all drivers' positions from the server and updates the drivers array.
   * Also sets an appropriate message in the alertService according to the response.
   */
  async getAllDrivers(): Promise<void> {
    // Use a proxy for dev purposes.
    // https://cors-anywhere.herokuapp.com/
    let token = sessionStorage.getItem('jwt');
    try {
      const data: any = await this.http.get(this.url, {
        headers: new HttpHeaders({
          'Authorization': 'Bearer ' + token,
          'Accept': '*/*',
          'Content-Type': 'application/json'
        }),
      }).toPromise();
      this.drivers = data;
      console.log(data);
      if (data.length == 1) {
        this.alertService.setMessage("driver position has been updated.");
      } else {
        this.alertService.setMessage("driver positions have been updated.");
      }
      // Set errorCode to 200 for a successful request.
      this.alertService.setCode(200);
    } catch (error) {
      console.error('HTTP Request was not successful', error);
      // @ts-ignore
      if (error.status == 400) {
        this.alertService.setMessage("There are no driver positions for the date you selected.");
      } else {
        // @ts-ignore
        this.alertService.setMessage(error.statusText + " - Error: " + error.status);
      }
      // Set errorCode to the error status.
      // @ts-ignore
      this.alertService.setCode(error.status);
    }
  }

  /**
   * Increases the current date by one day and updates the formattedDate property and the map.
   */
  increaseDate() {
    const newDate = new Date(this.myDate);
    newDate.setDate(newDate.getDate() + 1);
    this.myDate = newDate;
    this.formattedDate = format(this.myDate, 'MM / dd / yy');
    this.initMap();
  }

  /**
   * Decreases the current date by one day and updates the formattedDate property and the map.
   */
  decreaseDate() {
    const newDate = new Date(this.myDate);
    newDate.setDate(newDate.getDate() - 1);
    this.myDate = newDate;
    this.formattedDate = format(this.myDate, 'MM / dd / yy');
    this.initMap();
  }

  // Initializes the Google Maps "Map" after this component is initialized
  ngOnInit() {
    this.isLoading = true;
    setTimeout(() => {
      console.log("waiting")
      this.allDriverPositionsService.showingAllDrivers$.subscribe(showingAllDrivers => {
        this.showingAllDrivers = showingAllDrivers;
      });

      this.tableControlService.selectedMonday$.subscribe(selectedMonday => {
        console.log("!!SelectedMonday delivered by Service: " + selectedMonday);
        this.myDate = selectedMonday;
        this.formattedDate = format(this.myDate, 'MM / dd / yy');
        console.log("started map");
        this.initMap();
      });
    }, 1000);
  }

  // Initialisiert die Google Maps "Map"
  async initMap(): Promise<void> {
    let formattedDate = format(this.myDate, 'yyyy-MM-dd');
    let dispatcher = sessionStorage.getItem("email");
    if (this.showingAllDrivers) {
      this.url = `https://cors-anywhere.herokuapp.com/https://dispodev.ew.r.appspot.com/api/dispo/getAllDrivers/${formattedDate}`;
    } else {
      this.url = `https://cors-anywhere.herokuapp.com/https://dispodev.ew.r.appspot.com/api/dispo/getAllDriversFromDispatcher/${formattedDate}/${dispatcher}`;
    }
    this.drivers = [];
    this.markers = [];
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


  cache: { [address: string]: google.maps.LatLng } = {};

  /**
   Adds markers to the map for each driver in this.drivers with a non-empty address.
   Sets an info window for each marker with the driver's details.
   @returns Promise that resolves when all markers have been added to the map.
   */
  async addMarkersToMap(): Promise<void> {
    try {
      for (const driver of this.drivers) {
        if (driver.address != "") {
          // Get latitude and longitude from driver address
          const latLng = await this.getLatLngFromAddress(driver.address);
          // Create a marker for the driver
          let marker = new google.maps.Marker({
            position: latLng,
            map: this.map,
            title: driver.firstName + " " + driver.lastName,
          });
          this.markers.push(marker);

          // Determine driver's status as a string
          let statusString: string = "";
          const deliveryDate = new Date(driver.deliveryTime);
          const deliveryTimeFormatted = deliveryDate.toLocaleString('en-US', {
            month: '2-digit',
            day: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          });
          switch (driver.status) {
            case "green":
              statusString = "available";
              break;
            case "red":
              statusString = "unavailable";
              break;
            case "blue":
              statusString = "vacation";
              break;
            default:
              statusString = "unknown";
              break;
          }

          // Create HTML content for the info window
          let driverName: string = driver.firstName + ' ' + driver.lastName;
          const contentString =
            '<div class="map-info">\n' +
            '  <span>' + driverName + '</span>\n' +
            '  <table class="table">\n' +
            '    <thead>\n' +
            '    <tr>\n' +
            '      <th scope="col">Location:</th>\n' +
            '      <td>' + driver.address + '</td>\n' +
            '    </tr>\n' +
            '    </thead>\n' +
            '    <tbody>\n' +
            '    <tr>\n' +
            '      <th scope="row">Clearing Time:</th>\n' +
            '      <td>' + deliveryTimeFormatted + '</td>\n' +
            '    </tr>\n' +
            '    <tr>\n' +
            '      <th scope="row">Status:</th>\n' +
            '      <td>' + statusString + '</td>\n' +
            '    </tr>\n' +
            '    <tr>\n' +
            '      <th scope="row">Truck:</th>\n' +
            '      <td>' + driver.truckVIN + '</td>\n' +
            '    </tr>\n' +
            '    <tr>\n' +
            '      <th scope="row">Trailer:</th>\n' +
            '      <td>' + driver.trailerVIN + '</td>\n' +
            '    </tr>\n' +
            '    </tbody>\n' +
            '  </table>\n' +
            '\n' +
            '</div>';

          // Create an info window for the marker with the HTML content
          const infowindow = new google.maps.InfoWindow({
            content: contentString,
          });

          // Add click listener to the marker that opens the info window and sets the details in the infocardsService
          marker.addListener("click", () => {
            if (this.currentInfoWindow) {
              this.currentInfoWindow.close();
            }
            infowindow.open(this.map, marker);
            this.currentInfoWindow = infowindow;
            this.infocardsService.setDetails(driver.firstName + " " + driver.lastName, driver.address, statusString, deliveryTimeFormatted, driver.truckVIN, driver.rideNumber.toString(), driver.trailerVIN);
          });
        }
      }
    } catch (error) {
      this.alertService.setMessage("An error occurred while adding markers to the map");
      console.log(error);
    }
  }


}
