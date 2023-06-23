import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { FormOption } from 'src/app/model/FormConfig.interface';
import { Item } from 'src/app/model/item.interface';
import { ServerService } from 'src/app/server/server.service';

@Component({
  selector: 'app-item-form',
  templateUrl: './item-form.component.html',
  styleUrls: ['./item-form.component.css']
})
export class ItemFormComponent implements OnInit {
  @Input() formOptions!:FormOption<Item>
  @Output() ItemData:EventEmitter<Item> = new EventEmitter()
  ItemForm:FormGroup = new FormGroup({})
  submitted:boolean = false
  subscription:Subscription[] = []

    constructor(
      private formBuilder:FormBuilder,
      private server:ServerService
    ) { }
  
  
    ngOnInit(): void {
      this.formInit()
      if(this.formOptions){
      if(this.formOptions.hasOwnProperty('type') && this.formOptions.type ==="update"){
        this.patchValue(this.formOptions.data as Item)
      }
      }
    }
  
  formInit(){
    this.ItemForm = this.formBuilder.group({
      name:['',[
        Validators.required
      ]],
      quantity:[0,[
        Validators.required
      ]]
    })
  
  }
  
  patchValue(data:Item){
    this.ItemForm.patchValue({
  ...data
    })
  }
  
  reset(){
  this.ItemForm.reset()
  }
  
  submit(){
  this.submitted = true
  if(this.ItemForm.invalid) return
  this.ItemData.emit(this.ItemForm.value)
  this.reset()
  
  }
  
}
