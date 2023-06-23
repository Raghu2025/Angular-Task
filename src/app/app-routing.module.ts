import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoleComponent } from './role/role.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserComponent } from './user/user.component';
import { ItemComponent } from './item/item.component';
import { SaleComponent } from './sale/sale.component';
import { AnalyticComponent } from './analytic/analytic.component';
import { AuthGuardService } from './service/auth-guard.service';

const routes: Routes = [
  {
   path:"",
   redirectTo:"login",
   pathMatch:"full"
  },
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
         component:RoleComponent,
         canActivate:[AuthGuardService],
         data:["admin"]
        },
        {
          path:"user",
          component:UserComponent,
          canActivate:[AuthGuardService],
          data:["admin"]
        },
        {
          path:"analytic",
          component:AnalyticComponent,
          canActivate:[AuthGuardService],
          data:["admin","supervisor"]
        },
        {
          path:"item",
          component:ItemComponent,
          canActivate:[AuthGuardService],
          data:["admin","supervisor"]

        },
        {
          path:"sale",
          component:SaleComponent,
          canActivate:[AuthGuardService],
          data:["admin","supervisor","sale"]
        }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
