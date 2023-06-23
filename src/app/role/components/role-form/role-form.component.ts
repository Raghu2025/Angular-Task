import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Role } from 'src/app/model/role.interface';
import { FormOption } from 'src/app/model/FormConfig.interface';

@Component({
  selector: 'app-role-form',
  templateUrl: './role-form.component.html',
  styleUrls: ['./role-form.component.css']
})
export class RoleFormComponent implements OnInit {
  @Input() formOptions!:FormOption<Role>
  @Output() roleData:EventEmitter<Role> = new EventEmitter()
  roleForm:FormGroup = new FormGroup({})
  submitted:boolean = false
    constructor(
      private formBuilder:FormBuilder
    ) { }
  
  
    ngOnInit(): void {
      this.formInit()
      if(this.formOptions){
      if(this.formOptions.hasOwnProperty('type') && this.formOptions.type ==="update"){
        this.patchValue(this.formOptions.data as Role)
      }
      }
    }
  
  
  formInit(){
    this.roleForm = this.formBuilder.group({
      name:['',[
        Validators.required
      ]]
    })
  
  }
  
  patchValue(data:Role){
    this.roleForm.patchValue({
  ...data
    })
  }
  
  reset(){
  this.roleForm.reset()
  }
  
  submit(){
  this.submitted = true
  if(this.roleForm.invalid) return
  let value =this.roleForm.value
  if(this.formOptions.type==="update"){
    value = {
      ...this.formOptions.data,
      ...this.roleForm.value
    }
  }
  this.roleData.emit(value)
  this.submitted = false
  this.reset()

  }
}
