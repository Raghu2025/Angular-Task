import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServerService } from '../server/server.service';
import { ResponseFromServer } from '../model/response.interface';
import { User } from '../model/user.interface';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
loginForm:FormGroup = new FormGroup({})
submitted:Boolean = false
error = {
  status:false,
  message:""
}
constructor(private formBuilder:FormBuilder,private server:ServerService,private router:Router) { }

  ngOnInit(): void {
  this.loginFormInit()
  }


loginFormInit(){
this.loginForm = this.formBuilder.group({
  email:['',[
    Validators.required,
    Validators.email
  ]],
  password:['',[
    Validators.required
  ]]
})
}

submit(){
 this.submitted = true
 console.log(this.loginForm)
 if(this.loginForm.invalid) return
 this.server.login(this.loginForm.value).subscribe((data:ResponseFromServer<User>)=>{
  if(data.success){
    console.log(data.data,":::::::")
     localStorage.setItem("Role",data.data.role)
     localStorage.setItem("Name",data.data.name)
     localStorage.setItem("id",data.data.id || "")
     this.redirect(data.data.role)
  }
  else{
    this.error = {
      status:true,
      message:data.message as string
    }

  }
 })
}

redirect(role:string){
let route = ""
switch(role){
  case "admin":
  route = "/dashboard/user"
  break;
  case "supervisor":
  route = "/dashboard/analytic"
  break;
  case "sale":
  route = "/dashboard/sale"
  break;
  default:
  break;
}
this.router.navigateByUrl(route)

}

resetForm(){
this.loginForm.reset()
}


}
