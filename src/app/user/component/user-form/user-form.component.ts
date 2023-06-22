import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/model/user.interface';
import { userFormOption } from 'src/app/model/userFormConfig.interface';
import { ServerService } from 'src/app/server/server.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
@Input() formOptions!:userFormOption
@Output() userData:EventEmitter<User> = new EventEmitter()
userForm:FormGroup = new FormGroup({})
submitted:boolean = false
  constructor(
    private formBuilder:FormBuilder
  ) { }


  ngOnInit(): void {
    this.formInit()
    if(this.formOptions){
    if(this.formOptions.hasOwnProperty('type') && this.formOptions.type ==="update"){
      this.patchValue(this.formOptions.data as User)
    }
    }
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
this.reset()
this.userData.emit(this.userForm.value)
}


}
