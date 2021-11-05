import { Injectable } from '@angular/core';
import { CommonService } from '../service/common.service';
import { ToastrCustomService } from '../service/toastr.service';
import { HttpClient, HttpBackend } from '@angular/common/http';
import { map, take } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class NonInterceptorService {
  private httpClient: HttpClient;

  constructor( handler: HttpBackend,
    private route: Router,
    private toastrService: ToastrCustomService,
    protected http: HttpClient,
    private commonService: CommonService)
    {
     this.httpClient = new HttpClient(handler);
  }
  getLatestPriceTicker(): Observable<any> {
    return this.httpClient.get('https://api.binance.com/api/v3/ticker/price?').pipe(
      map((data) => {
        this.commonService.loadingSpinnerCall(false);
        return data;
      })
    );
  }
//   getGeoCountry(lat,long){
//     // return this.http.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=${environment.googleApiKey}`).pipe(
//     //   map(data=>{
//     //   this.commonService.loadingSpinnerCall(false);
//     //   return data
//     // }))
//     return this.httpClient.get(`https://geocode.xyz/${lat},${long}?geoit=json`).pipe(
//       map(data=>{
//       this.commonService.loadingSpinnerCall(false);
//       return data
//     }))
//   }
  //Upload file using signed request
//   uploadFile(file: any, url: any) {
//     console.log(file)
//     return this.http.put(file,url,{headers: {'Content-Type': url.type}}).pipe(
//       map((data) => {
//         this.commonService.loadingSpinnerCall(false);
//         return data;
//       })
//     );
// }
}
