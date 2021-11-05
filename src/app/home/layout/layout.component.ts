import { Component, OnInit, Renderer2, OnDestroy } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit, OnDestroy {

  subscription: Subscription | any;
  globalListenFunc: Function | any;

  constructor(
    private renderer: Renderer2
  ) { }

  ngOnInit(): void {
    this.globalListenFunc = this.renderer.listen('document', 'mousemove', e => {
      // console.log(e);
    });
    this.subscription = fromEvent(document, 'keypress').subscribe((e: any) => {
      // console.log(e);
    });
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.globalListenFunc();
  }

}
