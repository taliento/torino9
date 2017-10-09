import { Component, ElementRef, NgZone, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from "@angular/forms";
import { MapsAPILoader } from '@agm/core';
import {} from '@types/googlemaps';

@Component({
    moduleId: module.id,
    selector: 'contact-map',
    templateUrl: './contact-map.component.html'
})

export class ContactMapComponent {
  @Input() mapTitle: string;
  @Input() mapLat: number;
  @Input() mapLng: number;

  @Output() mapCenter: EventEmitter<any> = new EventEmitter();

  zoom: number;

  public searchControl: FormControl;

  @ViewChild('mapComponent') mapComponent;

  @ViewChild("search")
  public searchElementRef: ElementRef;


  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone
  ) {}

  ngOnInit() {
    //set google maps defaults -> Narni centro geografico Italia
   this.zoom = 5;
   this.mapLat = 42.5176022;
   this.mapLng = 12.5156299;

    //create search FormControl
    this.searchControl = new FormControl();

    //set current position
    this.setCurrentPosition();

    //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ["address"]
      });
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          //set latitude, longitude and zoom
          this.mapLat = place.geometry.location.lat();
          this.mapLng = place.geometry.location.lng();
          this.zoom = 15;

          this.mapCenter.emit({lat:this.mapLat, lng:this.mapLng});
        });
      });
    });
  }

  private setCurrentPosition() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.mapLat = position.coords.latitude;
        this.mapLng = position.coords.longitude;
      });
    }
  }
}
