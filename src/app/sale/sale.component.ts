import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { ServerService } from '../server/server.service';
import { Item } from '../model/item.interface';
import { ItemFormComponent } from '../item/components/item-form/item-form.component';

@Component({
  selector: 'app-sale',
  templateUrl: './sale.component.html',
  styleUrls: ['./sale.component.css']
})
export class SaleComponent implements OnInit {
@ViewChild("componentContainer", { read: ViewContainerRef }) container!:ViewContainerRef 
subscription:Subscription[] = []
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
  

}
