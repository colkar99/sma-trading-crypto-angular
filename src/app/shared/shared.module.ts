import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { NgbModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
// import { DragScrollModule } from 'ngx-drag-scroll';
// import { SlickCarouselModule } from 'ngx-slick-carousel';
// import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

import { SafePipe } from './pipes/safe-pipe';
import { AppLoadingSpinner } from './components/loading-spinner/loading-spinner.component';


import { ToastrModule } from 'ngx-toastr';
import { environment } from 'src/environments/environment';



@NgModule({
  declarations: [
    AppLoadingSpinner,
    SafePipe,
    
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    // NgbModule,
    // NgbNavModule,
    ToastrModule.forRoot({
      timeOut: 4000,
      positionClass: 'toast-top-center',
      preventDuplicates: true,
    }),
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AppLoadingSpinner,
    SafePipe,
    // NgbModule,
    // NgbNavModule,
  ]
})
export class SharedModule { }
