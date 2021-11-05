import { CommonService } from 'src/app/shared/service/common.service';
import { Router } from '@angular/router';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-top-navbar',
  templateUrl: './top-navbar.component.html',
  styleUrls: ['./top-navbar.component.scss']
})
export class TopNavbarComponent implements OnInit {


  constructor(

  ) {
  }

  ngOnInit(): void {
  
  }
 
  

  logoutMethod() {
    // localStorage.clear();
    // sessionStorage.clear();
    // this.router.navigate(['/auth']);
  }

}
