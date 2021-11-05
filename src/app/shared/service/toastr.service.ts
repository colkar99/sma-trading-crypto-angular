import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ToastrCustomService {

  constructor(
    private toastService: ToastrService
  ) { }
  success(data?: any) {
    this.toastService.success(data);
  }
  changePwdMethod(data?: any) {
    this.toastService.success(data, '', {
      timeOut: 1800,
      positionClass: 'toast-top-center'
    });
  }
  error(error?: any) {
    this.toastService.error(`${error}`);
    // if (error.error.message) {
    //   this.toastService.error(`${error.error.message}`);
    // } else{
    //   this.toastService.error(`${error.statusText}`);
    // }
  }
  warning(data?: any) {
    this.toastService.warning(data);
  }
}
