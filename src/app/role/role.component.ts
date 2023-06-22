import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css']
})
export class RoleComponent implements OnInit {
  roleForm:FormGroup = new FormGroup({})
  submitted:Boolean = false
  constructor() { }

  ngOnInit(): void {
  }

}
