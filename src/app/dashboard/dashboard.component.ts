import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
name:string = ""
  constructor(private router:Router) { }

  ngOnInit(): void {
    this.getName()

  }

  signOut(){
    const remove = ["Role","id","name"]
    remove.forEach((data)=>{
      localStorage.removeItem(data)
    })
    this.router.navigateByUrl("/login")
  }

  getName(){
    const Name = localStorage.getItem("Name") 
    this.name = Name?.substring(0,2) || ""
  }

}
