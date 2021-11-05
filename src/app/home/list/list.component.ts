import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NonInterceptorService } from 'src/app/shared/interceptor/non-interceptor.service';
import { CommonService } from 'src/app/shared/service/common.service';
import { ExportToCsv } from 'export-to-csv';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  capital: any;
  orders: any = [];
  totalCommission:any = 0;
  url: string = "v1/user/getAllOrders";
  latestPrice: any = {};
  tickerNames: any = [];
  otherInfos: any ={totalOrders:0,openOrders: 0,closedOrders: 0, pl: 0,plC: 0};
  filterForm: any ;
  options = { 
    fieldSeparator: ',',
    quoteStrings: '"',
    decimalSeparator: '.',
    showLabels: true, 
    showTitle: true,
    title: 'My Awesome CSV',
    useTextFile: false,
    useBom: true,
    useKeysAsHeaders: true,
    // headers: ['Column 1', 'Column 2', etc...] <-- Won't work with useKeysAsHeaders present!
  };
  csvExporter = new ExportToCsv(this.options);
  constructor(
    private service: CommonService,
    private service2: NonInterceptorService,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.getAllOrders()
   this.initFilterForm()
   setInterval(()=>{
     this.getLatestPrice()
   },2000)
  //  this.csvExporter.generateCsv(this.data);

  }
  initFilterForm(){
    this.filterForm = this.fb.group({
      startDate: [''],
      endDate: [''],
      orderType: ['']
    })
  }
  getAllOrders():void{
    this.service.getMethod(this.url).subscribe((data: any)=>{
      this.orders = data.data
      this.capital = data.capital
      this.totalCommission = 0;
      for(let i of data.data){
        this.tickerNames.push(i.pairName)
        this.totalCommission += 0.20
      }
      console.log(this.tickerNames)
      this.getLatestPrice()
      debugger
    })
  }
  getLatestPrice(){

    this.service2.getLatestPriceTicker().subscribe((data: any) =>{
        for(let i of data){
            if(this.tickerNames.includes(i.symbol)){
              this.latestPrice[i.symbol] = i.price
            } 
        }
        this.otherInfos ={totalOrders:0,openOrders: 0,closedOrders: 0, pl: 0,plC: 0};

        for(let k of this.orders){
          let percent
          if(k.orderType == "BUY"){
            if(k.exitPrice){
              this.otherInfos.closedOrders ++;
              percent = (((k.exitPrice - k.entryPrice) / k.entryPrice) * 100).toFixed(2);
            }else{
              this.otherInfos.openOrders ++;

              percent = (((this.latestPrice[k.pairName] - k.entryPrice) / this.latestPrice[k.pairName]) * 100).toFixed(2);
            }
            k['profitLossPercent'] = percent
            k['profitLossCurrency'] = ((+percent/100) * +k['positionSizeCurrency']).toFixed(2)
          }else{
            if(k.exitPrice){
              this.otherInfos.closedOrders ++;
              percent = (((k.entryPrice - k.exitPrice) / k.entryPrice) * 100).toFixed(2);
            }else{
              this.otherInfos.openOrders ++;
              percent = (((k.entryPrice - this.latestPrice[k.pairName]) / this.latestPrice[k.pairName]) * 100).toFixed(2);
            }
            k['profitLossPercent'] = percent
            k['profitLossCurrency'] = ((+percent/100) * +k['positionSizeCurrency']).toFixed(2)
          }
          this.otherInfos.totalOrders ++;
          // this.otherInfos.pl += +k['profitLossPercent'];
          this.otherInfos.plC += +k['profitLossCurrency'];

        }
        this.otherInfos.pl =  (this.otherInfos.plC - this.totalCommission)/this.capital * 100;
        this.otherInfos.plC = this.otherInfos.plC - this.totalCommission;


        //

    })

  }
  submitMethod(){

    let val = this.filterForm.value
    this.url = `v1/user/getAllOrders?start=${val.startDate}&end=${val.endDate}&type=${val.orderType}`
    this.getAllOrders()
  }
  findNumPos(num: any){
    if (Math.sign(+num) > 0) {
      // Positive
      return true
    } else {
      // Negative
      return false
    }
  }

  exportAsCsv(): void{
    let newOr = []
    for(let order of this.orders){
      newOr.push({
        PairName: order.pairName,
        Status: !order.exitPrice ? "Open" : "Closed",
        Open: new Date(order.entryDate).toLocaleString(),
        TimeFrame: order.timeFrameInMin == "60" ? "1H": order.timeFrameInMin == "120" ? "2H":'',
        Side: order.orderType,
        Stoploss$: `${order.slPercent}%`,
        StoplossUSDT: `${order.riskPerTrade}$`,
        Capital: `${order.totalCapital}$`,
        Position_Size_$: `${order.positionSizeCurrency}$`,
        Position_Size_BTC: `${order.positionSizeBTC}`,
        Entry: `${order.entryPrice}`,
        Exit: order.exitPrice ? order.exitPrice :"",
        Fee: `${order.feesInPercent}%`,
        PL: `${order.profitLossPercent}%`,
        PL_USDT: `${order.profitLossCurrency}$`,
        Close: order.exitDate ? new Date(order.exitDate).toLocaleString(): "",
      })
    }
       this.csvExporter.generateCsv(newOr);
    console.log("CSV",newOr)
  }

  markAsRead(order: any){
    console.log(order)
    if(order.isRead) return
    this.service.postMethod('v1/user/isRead',{_id:order._id}).subscribe((data:any)=>{
      this.getAllOrders()
    })
  }

  removeFromList(order: any): void{

  }

}
