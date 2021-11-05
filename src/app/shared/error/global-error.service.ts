import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({providedIn:'root'})
export class GlobalErrorService {
  errorHandleEmitter = new Subject<any>();
  handlingErrorMessage(error: HttpErrorResponse){
    this.errorHandleEmitter.next(error)
  }

}
