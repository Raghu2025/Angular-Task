import { Component, OnInit } from '@angular/core';
import { Item } from '../model/item.interface';

@Component({
  selector: 'app-analytic',
  templateUrl: './analytic.component.html',
  styleUrls: ['./analytic.component.css']
})
export class AnalyticComponent implements OnInit {
  totalSale:number = 0
  totalSaleToday:number = 0
  PProducts:Array<Item> = []

  constructor() { }

  ngOnInit(): void {
  }
  
  getData(){
    
  }
}
