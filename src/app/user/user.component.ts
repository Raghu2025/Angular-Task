import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { UserFormComponent } from './component/user-form/user-form.component';
import { Subscription } from 'rxjs';
import { User } from '../model/user.interface';
import { ServerService } from '../server/server.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
@ViewChild("componentContainer", { read: ViewContainerRef }) container!:ViewContainerRef 
Users:User[] = new Array()
subscription:Subscription[] = new Array()
  constructor(
    private server:ServerService
  ) { }

  ngOnInit(): void {
    this.getUsers()
  }

  getUsers(){
  this.subscription.push(
    this.server.getData('users').subscribe((data)=>{
      this.Users = data.map((di:string)=>{
         if(typeof(di)==="string"){
          return JSON.parse(di)
         }
         return di
      })
      console.log(this.Users)
    })
  )
  }

  openModal(){
    this.container?.clear()
    const form = this.container?.createComponent(UserFormComponent)
    form.instance.formOptions = {
      type:"add",
      name:"User"
    }

   this.subscription.push(
    form.instance.userData.subscribe((data:User)=>{
      this.subscription.push(this.server.saveData("users",data).subscribe((data)=>{
          this.container.clear()
          this.getUsers()
        }))
  
    })
    )
  }

  deleter(){

  }

  updater(data:User){
    this.container?.clear()
    const form = this.container?.createComponent(UserFormComponent)
    form.instance.formOptions = {
      type:"update",
      name:"User",
      data:data
    }

   this.subscription.push(
    form.instance.userData.subscribe((data:User)=>{
      // this.subscription.push(this.server.saveData("users",data).subscribe((data)=>{
      //     this.container.clear()
      //   }))
  
    })
    ) 
  }

  ngOnDestroy(){
   this.container.clear()
   this.subscription.forEach(sub => sub.unsubscribe())
  }

}
