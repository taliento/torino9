import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './navbar.component';

@NgModule({
  imports: [ RouterModule, NgbModule, CommonModule ],
  declarations: [ NavbarComponent ],
  exports: [ NavbarComponent ]
})
export class NavbarModule {}
