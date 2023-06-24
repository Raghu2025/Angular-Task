import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Role } from 'src/app/model/role.interface';
import { User } from 'src/app/model/user.interface';
import { FormOption } from 'src/app/model/FormConfig.interface';
import { ServerService } from 'src/app/server/server.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
@Input() formOptions!:FormOption<User>
@Output() userData:EventEmitter<User> = new EventEmitter()
userForm:FormGroup = new FormGroup({})
submitted:boolean = false
subscription:Subscription[] = []
error={
status:false,
message:""
}
Roles:Role[] = []
  constructor(
    private formBuilder:FormBuilder,
    private server:ServerService
  ) { }


  ngOnInit(): void {
    this.formInit()
    this.getRole()
    if(this.formOptions){
    if(this.formOptions.hasOwnProperty('type') && this.formOptions.type ==="update"){
      this.patchValue(this.formOptions.data as User)
    }
    }
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

formInit(){
  this.userForm = this.formBuilder.group({
    name:['',[
      Validators.required
    ]],
    role:['',[
      Validators.required
    ]],
    email:['',[
      Validators.required,
      Validators.email
    ]],
    password:['',[
      Validators.required
    ]],
    confirmPassword:['',[
      Validators.required
    ]]
  })

}

patchValue(data:User){
  this.userForm.patchValue({
...data
  })
}

reset(){
this.userForm.reset()
}

submit(){
this.submitted = true
if(this.userForm.invalid) return
if(this.userForm.value.password !== this.userForm.value.confirmPassword) return
let value =this.userForm.value
if(this.formOptions.type==="update"){
  value = {
    ...this.formOptions.data,
    ...this.userForm.value
  }
}
this.userData.emit(value)
this.submitted = false
// this.reset()

}


}

