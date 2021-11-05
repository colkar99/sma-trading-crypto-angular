import { ErrorHandler, Injectable, Injector} from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { GlobalErrorService } from './global-error.service';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler{

constructor(private globalErrorService: GlobalErrorService,private injector: Injector){}
  handleError(error: HttpErrorResponse){
    let router = this.injector.get(Router);
    alert(error);
    console.log("error",error)
    // this.globalErrorService.handlingErrorMessage(error);
  }
}
