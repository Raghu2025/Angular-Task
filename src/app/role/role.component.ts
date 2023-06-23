import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Role } from '../model/role.interface';
import { Subscription } from 'rxjs';
import { ServerService } from '../server/server.service';
import { RoleFormComponent } from './components/role-form/role-form.component';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css']
})
export class RoleComponent implements OnInit {
  @ViewChild("componentContainer", { read: ViewContainerRef }) container!:ViewContainerRef 
  roleForm:FormGroup = new FormGroup({})
  submitted:Boolean = false
  Roles:Role[] = new Array()
  subscription:Subscription[] = new Array()

  constructor(
    private server:ServerService
  ) { }

  ngOnInit(): void {
    this.getRole()
  }




  
  getRole(){
    this.subscription.push(
      this.server.getData('roles').subscribe((data)=>{
        this.Roles = data.map((di:string)=>{
           if(typeof(di)==="string"){
            return JSON.parse(di)
           }
           return di
        })
      })
    )
   console.log(this.Roles)
    }
  
  openModal(){
    this.container?.clear()
    const form = this.container?.createComponent(RoleFormComponent)
    form.instance.formOptions = {
        type:"add",
        name:"Role"
      }
  this.subscription.push(
  form.instance.roleData.subscribe((data:Role)=>{
  this.subscription.push(this.server.saveData("roles",data).subscribe((data)=>{
  this.container.clear()
  this.getRole()
     }))
    
      })
      )
    }
  
  deleter(id:string){
  this.subscription.push(this.server.delete(id,"roles").subscribe((data)=>{
      this.container.clear()
      this.getRole()
  }))
  }
  
    updater(data:Role){
      this.container?.clear()
      const form = this.container?.createComponent(RoleFormComponent)
      form.instance.formOptions = {
        type:"update",
        name:"Role",
        data:data
      }
     this.subscription.push(
      form.instance.roleData.subscribe((data:Role)=>{
        console.log(data,":::::::::")
        this.subscription.push(this.server.update(data.id,"roles",data).subscribe((data)=>{
            this.container.clear()
            this.getRole()
          }))
    
      })
      ) 
    }
  
    ngOnDestroy(){
     this.container.clear()
     this.subscription.forEach(sub => sub.unsubscribe())
    }

}
