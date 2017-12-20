import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { FooterComponent } from './footer.component';

@NgModule({
  imports: [NgbModule,RouterModule],
  declarations: [ FooterComponent ],
  exports: [ FooterComponent ]
})
export class FooterModule {}
