import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  // navToggleHandle: any = new Subject<any>();
  loadingSpinner: any = new BehaviorSubject(false);
 
  baseUrl: any = environment.backendApi;


  constructor(
    private http: HttpClient,
  ) {}
 
  loadingSpinnerCall(val: any) {
    this.loadingSpinner.next(val);
  }
  postWithoutToken(path?: any, dat?: any) {
    return this.http.post(this.baseUrl + path, dat, { headers: { skip: 'true' } }).pipe(
      map(data => {
        this.loadingSpinnerCall(false);
        return data;
      })
    );
  }
  getWithoutToken(path: any) {
    return this.http.get(this.baseUrl + path, { headers: { skip: 'true' } }).pipe(
      map(data => {
        this.loadingSpinnerCall(false);
        return data;
      })
    );
  }
  getWithoutTokenSpinner(path: any) {
    return this.http.get(this.baseUrl + path, {headers: {skip: 'true', spinner: 'false'}}).pipe(
      map(data => {
        return data;
      })
    );
  }
  postWithoutTokenSpinner(path: any, dat: any) {
    return this.http.post(this.baseUrl + path, dat, {headers: {skip: 'true', spinner: 'false'}}).pipe(
      map(data => {
        return data;
      })
    );
  }
  postWithoutSpinner(path: any, dat: any) {
    return this.http.post(this.baseUrl + path, dat, {headers: {search: 'true'}}).pipe(
      map(data => {
        return data;
      })
    );
  }
  postMethod(path?: any, dat?: any) {
    return this.http.post(this.baseUrl + path, dat).pipe(
      map(data => {
        this.loadingSpinnerCall(false);
        return data;
      })
    );
  }
  getLocation() {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resp => {
          resolve({lng: resp.coords.longitude, lat: resp.coords.latitude});
        },
        err => {
          reject(err);
        });
    });
  }
  getMethod(path?: any) {
    return this.http.get(this.baseUrl + path).pipe(
      map(data => {
        this.loadingSpinnerCall(false);
        return data;
      })
    );
  }
  getLatestPriceTicker(): Observable<any> {
    return this.http.get('https://api.binance.com/api/v3/ticker/price?',{headers: {skip: 'true', spinner: 'false'}}).pipe(
      map((data) => {
        this.loadingSpinnerCall(false);
        return data;
      })
    );
  }
  // getWithoutLoading(path?: any) {
  //   return this.http.get(this.baseUrl + path, { headers: { skip: 'true' }}).pipe(
  //     map(data => {
  //       this.commonService.loadingSpinnerCall(false);
  //       return data;
  //     })
  //   );
  // }
  // postWithoutLoading(path?: any, dat?: any) {
  //   return this.http.post(this.baseUrl + path, dat, { headers: { skip: 'true' }}).pipe(
  //     map(data => {
  //       this.commonService.loadingSpinnerCall(false);
  //       return data;
  //     })
  //   );
  // }
  // patchMethod(path?: any, dat?: any) {
  //   return this.http.patch(this.baseUrl + path, dat).pipe(
  //     map(data => {
  //       this.commonService.loadingSpinnerCall(false);
  //       return data;
  //     })
  //   );
  // }
}
