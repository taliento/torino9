import { Component,Input } from '@angular/core';

@Component({
  selector: 'map-component',
  templateUrl: 'map.component.html',
  styleUrls: ['map.component.css'],
})
export class MapComponent {
  @Input() title: string;
  @Input() lat: number;
  @Input() lng: number;
}
