import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { FooterComponent } from './footer.component';

@NgModule({
  imports: [NgbModule],
  declarations: [ FooterComponent ],
  exports: [ FooterComponent ]
})
export class FooterModule {}
