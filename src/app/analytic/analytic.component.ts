import { Component, OnInit } from '@angular/core';
import { Item } from '../model/item.interface';
import { ServerService } from '../server/server.service';
import { Analytical } from '../model/analytical.interface';
import { Sale } from '../model/sale.interface';

@Component({
  selector: 'app-analytic',
  templateUrl: './analytic.component.html',
  styleUrls: ['./analytic.component.css']
})
export class AnalyticComponent implements OnInit {
  totalSale:number = 0
  totalSaleToday:number = 0
  PProducts:Array<Sale> = []

  constructor(private server:ServerService) { }

  ngOnInit(): void {
    this.getData()
  }

  getData(){
    this.server.getAnalytical().subscribe((data:Analytical)=>{
      this.totalSale = data.total
      this.totalSaleToday = data.totalToday,
      this.PProducts = data.data
    })
    
  }
}
