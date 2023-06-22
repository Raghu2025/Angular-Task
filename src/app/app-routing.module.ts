import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoleComponent } from './role/role.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserComponent } from './user/user.component';
import { ItemComponent } from './item/item.component';
import { SaleComponent } from './sale/sale.component';
import { AnalyticComponent } from './analytic/analytic.component';

const routes: Routes = [
  {
    path:"login",
    component:LoginComponent
  },
  {
    path:"dashboard",
    component:DashboardComponent,
    children:[
        {
          path:"role",
         component:RoleComponent
        },
        {
          path:"user",
          component:UserComponent
        },
        {
          path:"analytic",
          component:AnalyticComponent
        },
        {
          path:"item",
          component:ItemComponent

        },
        {
          path:"sale",
          component:SaleComponent
        }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
