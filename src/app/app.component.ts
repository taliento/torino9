import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

  public constructor(private titleService: Title ) { }

  ngOnInit() {
    this.titleService.setTitle( 'Gruppo Scout Torino 9' );
  }

}
