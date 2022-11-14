import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Marker } from 'models/marker.module';
import { MapControllerService } from '../services/map-controller.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private router: Router, private alertController: AlertController, private mapController: MapControllerService) {}


  async sendMarker(Title, lat, long){
    if(Title =="" || lat =="" || long ==""){
      const alert = await this.alertController.create({
        header: 'Alerta',
        message: 'Mi amor, Mi cielo, Mi tesoro, Mi Rey/Reyna, Mi vida, Mi media Naranja te hace falta llenar los parametros para ejecutarme, Por favorcito llenalo mi vida♥',
        buttons: ['Ok']

      });
      await alert.present();
    }
    else{
      var marker: Marker = {
        position: {
          lat: parseFloat(lat),
          long: parseFloat(long),
        },
        title: Title
      }
      this.mapController.addMarker(marker);
      this.router.navigate(['./mapa']);
    }
    
  }

}
