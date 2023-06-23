import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { FormOption } from 'src/app/model/FormConfig.interface';
import { Item } from 'src/app/model/item.interface';
import { Sale } from 'src/app/model/sale.interface';
import { ServerService } from 'src/app/server/server.service';

@Component({
  selector: 'app-sale-form',
  templateUrl: './sale-form.component.html',
  styleUrls: ['./sale-form.component.css']
})
export class SaleFormComponent implements OnInit {
  @Input() formOptions!:FormOption<Sale | Item>
  @Output() SaleData:EventEmitter<Sale> = new EventEmitter()
 SaleForm:FormGroup = new FormGroup({})
  submitted:boolean = false
  subscription:Subscription[] = []

    constructor(
      private formBuilder:FormBuilder
    ) { }
  
  
    ngOnInit(): void {
      this.formInit()
      if(this.formOptions){
        this.patchValue({...this.formOptions.data as Sale,itemId:this.formOptions.data?.id as string || ""})
      // if(this.formOptions.hasOwnProperty('type') && this.formOptions.type ==="update"){
      //   this.patchValue(this.formOptions.data as Sale)
      // }
      }
    }
  
  formInit(){
    this.SaleForm = this.formBuilder.group({
      name:['',[
        Validators.required
      ]],
      itemId:['',[
        Validators.required
      ]],
      quantity:[0,[
        Validators.required
      ]],
      buy:[1,[
        Validators.required
      ]]
    })
  
  }
  
  patchValue(data:Sale){
    this.SaleForm.patchValue({
  ...data
    })
  }
  
  reset(){
  this.SaleForm.reset()
  }
  
  submit(){
  this.submitted = true
  console.log(this.SaleForm)
  if(this.SaleForm.invalid) return
  let value =Object.assign({},this.SaleForm.value)
  delete value.quantity
  if(this.formOptions.type==="update"){
    value = {
      ...this.formOptions.data,
      ...this.SaleForm.value
    }
  }
  this.SaleData.emit(value)
  
  }
}
