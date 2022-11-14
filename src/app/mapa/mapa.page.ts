import { Component, OnInit } from '@angular/core';
import { CoordInfor } from 'models/coord-info.module';
import { Marker } from 'models/marker.module';
import { MapControllerService } from '../services/map-controller.service';

declare var google;
@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.page.html',
  styleUrls: ['./mapa.page.scss'],
})
export class MapaPage implements OnInit {

  map = null;
  marker: Marker = null;
  CoordInfor: CoordInfor = null;

  constructor(private mapController: MapControllerService) { }


  ngOnInit() {
    this.marker = this.mapController.getMarker();
    this.loadMap();

  }


  loadMap() {
    // create a new map by passing HTMLElement
    const mapEle: HTMLElement = document.getElementById('map');
    // create LatLng object
    const myLatLng = {
      lat: this.marker.position.lat,
      lng: this.marker.position.long
    };
    // create map
    this.map = new google.maps.Map(mapEle, {
      center: myLatLng,
      zoom: 12
    });

    google.maps.event.addListenerOnce(this.map, 'idle', () => {
      this.addMarker(this.marker);
      mapEle.classList.add('show-map');
    });
  }

  addMarker(marker: Marker) {
    var mapMarker = new google.maps.Marker({
      position: marker.position,
      map: this.map,
      title: marker.title
    });
    this.addInforMarker(marker, mapMarker);
    return mapMarker;
  }

  addInforMarker(marker: Marker, mapMarker: any) {
    this.mapController.getHttpData(marker).subscribe((coordData: any) => {
      this.CoordInfor = {
        country: coordData.items[0].address.countryName,
        city: coordData.items[0].address.city,
        marker: marker

      }
    });
    let infoWindowContent = `
    <div id="content" style="color: black;">
      <h2 id="firstHeading" class="firstHeading"> ${marker.title} </h2>
      <p>Pais: ${this.CoordInfor.country} </p>
      <p>Ciudad: ${this.CoordInfor.city} </p>
    </div>
    `;
    let infoWindow = new google.maps.InfoWindow({ content: infoWindowContent });

    mapMarker.addListener('click', () => {
      infoWindow.open(this.map, mapMarker);
    });
  }

}
