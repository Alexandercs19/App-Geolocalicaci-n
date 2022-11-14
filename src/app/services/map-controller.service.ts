import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Marker } from 'models/marker.module';

const apiKey = "zrDkhwnB3AtEQ0muz2CMQeRgaF0jxtLxi6MRV0k22vY";

@Injectable({
  providedIn: 'root'
})
export class MapControllerService {

  private marker: Marker = null;

  constructor(private http: HttpClient) { }

  getMarker() {
    return this.marker
  }

  addMarker(marker: Marker) {
    this.marker = marker;
  }

  resetMarker(marker: Marker) {
    this.marker = marker;
  }

  getHttpData(marker: Marker) {
    var link = `https://revgeocode.search.hereapi.com/v1/revgeocode?at=${marker.position.lat},${marker.position.long}&lang=es-DO&apikey=${apiKey}`;
    return this.http.get(link);

  }
}
