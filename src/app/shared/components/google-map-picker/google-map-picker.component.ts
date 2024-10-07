import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, EventEmitter, NgZone, OnInit, Output, ViewChild } from '@angular/core';
import { GoogleMap, GoogleMapsModule, MapAdvancedMarker, MapInfoWindow, MapMarker } from '@angular/google-maps';
import { MatCardModule } from '@angular/material/card';
import { ToastrService } from 'ngx-toastr';
import { GeocodingService } from '../../../core/services/geocoding.service';
import { GeocoderResponse } from '../../../core/models/geocoder-response.model';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';


export interface GoogleLocationAddress {
  home?: string;
  postal_code: string;
  street?: string;
  region?: string;
  city?: string;
  country?: string;
};

export interface AdressLatLng {
  houseNo?: string;
  postal_code?: string;
  street?: string;
  state?: string;
  city?: string;
  country?: string;
  latitude?: number;
  longitude?: number;
  mapLocation?: string;
}

export const GoogleAddressParse = {
  home: ["street_number"],
  postal_code: ["postal_code"],
  street: ["street_address", "route"],
  region: [
    "administrative_area_level_1",
    "administrative_area_level_2",
    "administrative_area_level_3",
    "administrative_area_level_4",
    "administrative_area_level_5"
  ],
  city: [
    "locality",
    "sublocality",
    "sublocality_level_1",
    "sublocality_level_2",
    "sublocality_level_3",
    "sublocality_level_4"
  ],
  country: ["country"]
};

@Component({
  selector: 'app-google-map-picker',
  standalone: true,
  imports: [CommonModule,
    GoogleMapsModule,
    MatCardModule,
    GoogleMap, MapMarker,
    MapAdvancedMarker,
    DragDropModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, MatIconModule
  ],
  templateUrl: './google-map-picker.component.html',
  styleUrl: './google-map-picker.component.scss'
})
export class GoogleMapPickerComponent implements OnInit, AfterViewInit {


  selectedAddress: AdressLatLng = {};
  searchValue = '';
  @ViewChild('searchPlace') searchElementRef!: ElementRef;
  @ViewChild('mapMarker') mapMarker = ElementRef;
  @ViewChild('markerElem') markerElem = ElementRef;
  @Output() addressSelected: EventEmitter<AdressLatLng> = new EventEmitter();

  @ViewChild(GoogleMap, { static: false }) map!: GoogleMap;
  @ViewChild(MapInfoWindow, { static: false }) infoWindow!: MapInfoWindow;

  mapZoom = 12;
  mapCenter!: google.maps.LatLng;
  mapOptions: google.maps.MapOptions = {
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    zoomControl: true,
    scrollwheel: true,
    fullscreenControl: true,
    disableDoubleClickZoom: true,
    maxZoom: 20,
    minZoom: 4,
    mapId: "DEMO_MAP_ID"

  };

  markerLabel ="Move pin to adjust exact location";
  markerInfoContent = '';
  markerOptions: google.maps.MarkerOptions = {
    draggable: false,
    animation: google.maps.Animation.DROP,
  };


  advancedMarkerOptions: google.maps.marker.AdvancedMarkerElementOptions = {
    gmpDraggable : true,
    gmpClickable:  true,
    title: 'A marker using a custom PNG Image',
  };

  geocoderWorking = false;
  geolocationWorking = false;

  address: string | undefined;
  formattedAddress?: string  = '';
  locationCoords?: google.maps.LatLng | null = null;
  latitude!: any;
  longitude!: any;

  get isWorking(): boolean {
    return this.geolocationWorking || this.geocoderWorking;
  }

  constructor(private geocodingService: GeocodingService,
    private toastr: ToastrService, private ngZone: NgZone
  ) {

  }
  ngOnInit(): void {
    this.getCurrentLocation();
  }

  ngAfterViewInit(): void {
    // Align search box to center
    //  this.map.controls[google.maps.ControlPosition.TOP_CENTER].push(
    //   this.findMeBtn.nativeElement
    // );
    // Binding autocomplete to search input control
    let autocomplete = new google.maps.places.Autocomplete(
      this.searchElementRef.nativeElement
    );

    autocomplete.addListener('place_changed', () => {
      this.ngZone.run(() => {
        //get the place result
        let place: google.maps.places.PlaceResult = autocomplete.getPlace();

        //verify result
        if (place.geometry === undefined || place.geometry === null) {
          return;
        }

        console.log({ place }, place.geometry.location?.lat());

        //set latitude, longitude and zoom
        this.latitude = place.geometry.location?.lat();
        this.longitude = place.geometry.location?.lng();
        const point: google.maps.LatLngLiteral = {
          lat: this.latitude,
          lng: this.longitude,
        };
        this.mapCenter = new google.maps.LatLng(point);
      });
    });
  }


  openInfoWindow(marker: MapAdvancedMarker) {
    this.infoWindow.open(marker);
  }

  getCurrentLocation() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.latitude= position.coords.latitude;
        this.longitude= position.coords.longitude;
        const point: google.maps.LatLngLiteral = {
          lat: this.latitude,
          lng: this.longitude,
        };
        this.mapCenter = new google.maps.LatLng(point);
        this.map.panTo(point);
        this.locationCoords = new google.maps.LatLng(point);
      },
      (error) => {
        this.geolocationWorking = false;

        if (error.PERMISSION_DENIED) {
          this.toastr.error("Couldn't get your location", 'Permission denied');
        } else if (error.POSITION_UNAVAILABLE) {
          this.toastr.error(
            "Couldn't get your location",
            'Position unavailable'
          );
        } else if (error.TIMEOUT) {
          this.toastr.error("Couldn't get your location", 'Timed out');
        } else {
          this.toastr.error(error.message, `Error: ${error.code}`);
        }
      },
      { enableHighAccuracy: true }
    );
  }

  pickMapLocation() {
    const point: google.maps.LatLngLiteral = {
      lat: this.latitude,
      lng: this.longitude,
    };
    this.geolocationWorking = true;
        this.selectedAddress.latitude = this.latitude,
          this.selectedAddress.longitude = this.longitude;
        this.geocoderWorking = true;
        this.geocodingService
          .geocodeLatLng(point)
          .then((response: GeocoderResponse) => {
            if (response.status === 'OK' && response.results?.length) {
              const value = response.results[0];

              this.setAddressObject(value.address_components);

              this.locationCoords = new google.maps.LatLng(point);

              this.mapCenter = new google.maps.LatLng(point);
              this.map.panTo(point);

              this.address = value.formatted_address;
              this.formattedAddress = value.formatted_address;
              this.markerInfoContent = value.formatted_address;

            } else {
              this.toastr.error(response.error_message, response.status);
            }
          })
          .finally(() => {
            this.geocoderWorking = false;
          });
  }

  onMapDragEnd(event: google.maps.KmlMouseEvent) {

    const point: google.maps.LatLngLiteral = {
      lat: event.latLng!.lat(),
      lng: event.latLng!.lng(),
    };
    this.selectedAddress.latitude = event.latLng!.lat();
    this.selectedAddress.longitude = event.latLng!.lng();

    this.geocoderWorking = true;
    this.geocodingService
      .geocodeLatLng(point)
      .then((response: GeocoderResponse) => {
        if (response.status === 'OK') {
          if (response.results.length) {
            const value = response.results[0];

            this.locationCoords = new google.maps.LatLng(point);

            this.mapCenter = new google.maps.LatLng(point);
            this.map.panTo(point);

            this.address = value.formatted_address;
            this.formattedAddress = value.formatted_address;


            this.setAddressObject(value.address_components);
            this.markerInfoContent = value.formatted_address;
          }
        }
      })
      .finally(() => {
        this.geocoderWorking = false;
      });
  }

  invokeEvent(place: Object) {
    //this.setAddress.emit(place);
    console.log(place);
  }

  setAddressObject(address_components: any) {
    let address: GoogleLocationAddress = {
      home: "",
      postal_code: "",
      street: "",
      region: "",
      city: "",
      country: ""
    };
    address_components.forEach((component: any) => {
      for (let shouldBe in GoogleAddressParse) {
        if (GoogleAddressParse[shouldBe as keyof typeof GoogleAddressParse].indexOf(component.types[0]) !== -1) {
          if (shouldBe === "country") {
            address[shouldBe as keyof typeof address] = component.short_name;
          } else {
            address[shouldBe as keyof typeof address] = component.long_name;
          }
        }
      }
    });
    if (!!address) {
      this.selectedAddress.houseNo = address.home;
      this.selectedAddress.street = address.street;
      this.selectedAddress.postal_code = address.postal_code;
      this.selectedAddress.city = address.city;
      this.selectedAddress.state = address.region;
      this.selectedAddress.country = address.country;
      this.selectedAddress.mapLocation = this.formattedAddress;
    }
    this.addressSelected.emit(this.selectedAddress);
  }


}



// {"address_line1":"531, 4th Cross Rd, Ayyappa Layout, Chandra Layout, Marathahalli, Bengaluru, Bengaluru Urban, Bangalore Division, KA, 560037","house_number":"66","address_line2":"555","city":268,"street_name":"666","latitude":12.953462,"longitude":77.703667,"booking_for":"home","app":"web_consumer"}