import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { ServerService } from '../server/server.service';
import { Item } from '../model/item.interface';
import { ItemFormComponent } from '../item/components/item-form/item-form.component';
import { SaleFormComponent } from './sale-form/sale-form.component';
import { Sale } from '../model/sale.interface';

@Component({
  selector: 'app-sale',
  templateUrl: './sale.component.html',
  styleUrls: ['./sale.component.css']
})
export class SaleComponent implements OnInit {
@ViewChild("componentContainer", { read: ViewContainerRef }) container!:ViewContainerRef 
previousValue:Item[] = []
subscription:Subscription[] = []

searchBtn = {
  click:false,
  query:""
}

Items:Item[] = []
  constructor(private server:ServerService) { }

  ngOnInit(): void {
    this.getItems()
  }

  getItems(){
    this.subscription.push(
      this.server.getData('items').subscribe((data)=>{
        this.Items = data.map((di:string)=>{
           if(typeof(di)==="string"){
            return JSON.parse(di)
           }
           return di
        })
        this.previousValue = new Array(...this.Items)
      })
    )
    }

  updater(data:Item){
      this.container?.clear()
      const form = this.container?.createComponent(ItemFormComponent)
      form.instance.formOptions = {
        type:"update",
        name:"Item",
        data:data
      }
  
     this.subscription.push(
      form.instance.ItemData.subscribe((data:Item)=>{
        this.subscription.push(this.server.update(data.id as string,"items",data).subscribe((data)=>{
            this.container.clear()
            this.getItems()
          }))
    
      })
      ) 
    }

  ngOnDestroy(){
      this.container.clear()
      this.subscription.forEach(sub => sub.unsubscribe())
    }

  searchItem() {
    const searchQuery = this.searchBtn.query
    if(!searchQuery){return}
    this.searchBtn.click = true
    this.Items = this.previousValue.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    sale(data:Item){
      this.container?.clear()
      const form = this.container?.createComponent(SaleFormComponent)
      form.instance.formOptions = {
        type:"add",
        name:"sale",
        data:data
      }
  
     this.subscription.push(
      form.instance.SaleData.subscribe((data:Sale)=>{
        console.log("hhhhhh",data)
        this.subscription.push(this.server.saveSale("sales",data).subscribe((data)=>{
            this.container.clear()
            this.getItems()
          }))
    
      })
      ) 
    }
  
resetSearch(){
  this.searchBtn.click = false
  this.searchBtn.query = ""
  this.Items = new Array(...this.previousValue)

}

}
