import { Component } from '@angular/core';

@Component({
  selector: 'map-component',
  templateUrl: 'map.component.html',
  styleUrls: ['map.component.css'],
})
export class MapComponent {
  title: string = 'Siamo qui!';
  lat: number = 45.1033206;
  lng: number = 7.696940899999959;
}
