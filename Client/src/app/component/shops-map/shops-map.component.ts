import {Component, OnInit} from '@angular/core';
import {ShopService} from '../../service/shop.service';

@Component({
  selector: 'app-shops-map',
  templateUrl: './shops-map.component.html',
  styleUrls: ['./shops-map.component.css']
})

export class ShopsMapComponent implements OnInit {

  // Zoom level
  zoom: number = 10;
  //Start Position
  lat: number = 31.973001;
  lng: number = 34.792501;
  //Values
  markerName: string;
  markerLat: string;
  markerLng: string;
  markerDraggable: string;
  //Markers
  markers: Marker[] = [];

  constructor(private shopService: ShopService) {
  }

  ngOnInit(): void {
    this.shopService.list()
      .subscribe((data: any) => {
        if (data.success) {

        }
      })
  }

  clickedMarker(marker: Marker, index: number) {
    console.log('Clicked Marker: ' + marker.name + ' at index ' + index);
  }

  mapClicked($event: any) {
    const newMarker = {
      name: 'Untitled',
      lat: $event.coords.lat,
      lng: $event.coords.lng,
      draggable: false
    };

    this.markers.push(newMarker);

  }

  markerDragEnd(marker: any, $event: any) {
    console.log('dragEnd', marker, $event);

    const updMarker = {
      name: marker.name,
      lat: parseFloat(marker.lat),
      lng: parseFloat(marker.lng),
      draggable: false
    };

    const newLat = $event.coords.lat;
    const newLng = $event.coords.lng;


  }

  addMarker() {
    console.log('Adding Marker');
    let isDraggable = false;
    if (this.markerDraggable == 'yes') {
      isDraggable = true;
    }

    const newMarker = {
      name: this.markerName,
      lat: parseFloat(this.markerLat),
      lng: parseFloat(this.markerLng),
      draggable: isDraggable
    };

    this.markers.push(newMarker);

  }

  removeMarker(marker) {
    console.log('Removing marker...');
    for (var i = 0; i < this.markers.length; i++) {
      if (marker.lat == this.markers[i].lat && marker.lng == this.markers[i].lng) {
        this.markers.splice(i, 1);

      }
    }

  }

}

interface Marker {
  name?: string;
  lat: number;
  lng: number;
  draggable: boolean;
}
