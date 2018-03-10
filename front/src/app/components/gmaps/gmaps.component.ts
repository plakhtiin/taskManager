import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { FormControl } from '@angular/forms';
import {} from '@types/googlemaps';
import { MapsAPILoader } from '@agm/core';

@Component({
  selector: 'app-gmaps',
  templateUrl: './gmaps.component.html',
  styleUrls: ['./gmaps.component.scss']
})
export class GmapsComponent implements OnInit {
  public showMap: boolean;
  @ViewChild("search")
  public searchElementRef: ElementRef;
  public searchControl: FormControl;
  public isFavourite: boolean;
  public latitude: number;
  public longitude: number;
  public zoom: number;
  public visible: boolean;

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone
  ) { }

  ngOnInit() {
    this.showMap = false;
    this.isFavourite = false;

    // set default coords and zoom
    this.latitude = 25.886;
    this.longitude = -70.268;
    this.zoom = 5;
    this.visible = false;

    //create search FormControl
    this.searchControl = new FormControl();

    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement);

      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          //set latitude, longitude and zoom
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.visible = true;
          this.zoom = 12;

          this.triangleCoords.push({
            lat: this.latitude,
            lng: this.longitude,
            label: place.formatted_address,
            descr: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla pharetra libero faucibus dui scelerisque imperdiet. Cras pulvinar metus metus, suscipit tempor turpis auctor a. In hendrerit felis in mi malesuada hendrerit. Fusce egestas justo ut est blandit, ac fringilla nisi tincidunt. Nam urna mi, vestibulum id iaculis sit amet, aliquet porttitor risus. Nullam ut magna vitae felis lacinia viverra. Fusce interdum diam non metus scelerisque dignissim. Donec diam neque, iaculis sit amet venenatis rutrum, pretium in felis. Morbi vitae blandit lacus. Morbi facilisis risus mauris. Pellentesque blandit congue est posuere porttitor.',    
            isFavorite: false,
            imgUrl: 'assets/images.jpeg'
          })
        })
      })
    })
  }

  toggleMap() {
    this.showMap = !this.showMap;
  }
  toFavorite(coord: Marker) {
    this.ngZone.run(() => {
      coord.isFavorite = !coord.isFavorite;
    })
    console.log(`${coord.label}: ${coord.isFavorite}`);
  }

  // coords
  public triangleCoords: Marker[] = [
    {
      lat: 25.774,
      lng: -80.190,
      label: 'Miami',
      draggable: false,
      descr: 'Miami is a major port city on the Atlantic coast of south Florida in the southeastern United States. As the seat of Miami-Dade County, the municipality is the principal, central, and the most populous city of the Miami metropolitan area and part of the second-most populous metropolis in the southeastern United States. According to the U.S. Census Bureau, Miami\'s metro area is the eighth-most populous and fourth-largest urban area in the U.S., with a population of around 5.5 million.',
      isFavorite: false,
      imgUrl: 'assets/miami.jpg'
    },
    {
      lat: 18.466, 
      lng: -66.118,
      label: 'San Juan',
      draggable: false,
      descr: 'San Juan is the capital and most populous municipality in the Commonwealth of Puerto Rico, an unincorporated territory of the United States. As of the 2010 census, it had a population of 395,326 making it the 46th-largest city under the jurisdiction of the United States. San Juan was founded by Spanish colonists in 1521, who called it Ciudad de Puerto Rico. Puerto Rico\'s capital is the second oldest European-established capital city in the Americas, after Santo Domingo, in the Dominican Republic.[5] Several historical buildings are located in San Juan; among the most notable are the city\'s former defensive forts, Fort San Felipe del Morro and Fort San Cristóbal, and La Fortaleza, the oldest executive mansion in continuous use in the Americas.',
      isFavorite: false,
      imgUrl: 'assets/san-juan.jpg'
    },
    {
      lat: 32.321, 
      lng: -64.757,
      label: 'Bermuda',
      draggable: false,
      descr: 'Bermuda is a British Overseas Territory in the North Atlantic Ocean. It is approximately 1,070 km (665 mi) east-southeast of Cape Hatteras, North Carolina; 1,236 km (768 mi) south of Cape Sable Island, Nova Scotia; and 1,578 km (981 mi) north of Puerto Rico. The capital city is Hamilton. Bermuda is an associate member of Caribbean Community (CARICOM).',
      isFavorite: false,
      imgUrl: 'assets/bermuda.jpg'
    }
  ];
  // options for info window
  infoOptions = {
    border: false,
    borderRadius: '10px',
    closeOnMapClick: true,
    closeWhenOthersOpen: true,
    fontColor: '#0091EA',
    maxWidth: '600',
    padding: '10px 30px',
    maxHeight: 'auto'
  }

}
export interface Marker {
  lat: number,
  lng: number,
  label?: string,
  draggable?: boolean,
  descr?: string,
  isFavorite: boolean,
  imgUrl: string
}