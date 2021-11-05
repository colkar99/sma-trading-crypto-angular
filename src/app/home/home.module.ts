import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { LayoutComponent } from './layout/layout.component';
import { SideNavbarComponent } from './layout/side-navbar/side-navbar.component';
import { TopNavbarComponent } from './layout/top-navbar/top-navbar.component';
import { ToastrModule } from 'ngx-toastr';
import { SharedModule } from '../shared/shared.module';
import { ListComponent } from './list/list.component';


@NgModule({
  declarations: [HomeComponent, LayoutComponent, SideNavbarComponent, TopNavbarComponent, ListComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HomeRoutingModule,
    ToastrModule.forRoot({
      timeOut: 4000,
      positionClass: 'toast-top-center',
      preventDuplicates: true,
    }),
    SharedModule,
  ]
})
export class HomeModule { }
