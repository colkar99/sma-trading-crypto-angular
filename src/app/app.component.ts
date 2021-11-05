import { Component,ChangeDetectorRef,OnInit } from '@angular/core';
import { CommonService } from './shared/service/common.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  loadingSpninerHide: boolean = false;
  constructor(
    public commonSer: CommonService,
    private cdRef: ChangeDetectorRef
  ) {}
  ngOnInit(): void {
    this.commonSer.loadingSpinner.subscribe((data: boolean) => {
      this.loadingSpninerHide = data;
      this.cdRef.detectChanges();
    });
  }
}
