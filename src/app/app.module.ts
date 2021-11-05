import { BrowserModule } from '@angular/platform-browser';
import { NgModule,ErrorHandler } from '@angular/core';
import { HttpClientModule,HTTP_INTERCEPTORS} from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { AuthInterceptor } from './shared/interceptor/auth-interceptor'
import { SharedModule } from './shared/shared.module';
import { GlobalErrorHandler } from './shared/error/global-error-handler';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    SharedModule,
    HttpClientModule,
    ToastrModule.forRoot({
      timeOut: 4000,
      positionClass: 'toast-top-center',
      preventDuplicates: true,
    }),
  ],
  providers: [
    {provide: ErrorHandler, useClass: GlobalErrorHandler},
  {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
],
  bootstrap: [AppComponent]
})
export class AppModule { }
