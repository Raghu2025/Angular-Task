import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
loginForm:FormGroup = new FormGroup({})
submitted:Boolean = false
constructor(private formBuilder:FormBuilder) { }

  ngOnInit(): void {
  this.loginFormInit()
  }


loginFormInit(){
this.loginForm = this.formBuilder.group({
  email:['',[
    Validators.required
  ]],
  passowrd:['',[
    Validators.required
  ]]
})
}

submit(){
 this.submitted = true
}

resetForm(){
this.loginForm.reset()
}


}
