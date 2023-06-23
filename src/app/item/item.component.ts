import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { Item } from '../model/item.interface';
import { Subscription } from 'rxjs';
import { ServerService } from '../server/server.service';
import { ItemFormComponent } from './components/item-form/item-form.component';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
  @ViewChild("componentContainer", { read: ViewContainerRef }) container!:ViewContainerRef 
  Items:Item[] = new Array()
  subscription:Subscription[] = new Array()
    constructor(
      private server:ServerService
    ) { }
  
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
        console.log(this.Items)
      })
    )
    }
  
    openModal(){
      this.container?.clear()
      const form = this.container?.createComponent(ItemFormComponent)
      form.instance.formOptions = {
        type:"add",
        name:"Item"
      }
  
     this.subscription.push(
      form.instance.ItemData.subscribe((data:Item)=>{
        this.subscription.push(this.server.saveData("items",data).subscribe((data)=>{
            this.container.clear()
            this.getItems()
          }))
    
      })
      )
    }
  
    deleter(id?:string){
      this.subscription.push(this.server.delete(id as string,"items").subscribe((data)=>{
         this.getItems()
          this.container.clear()
      }))
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
