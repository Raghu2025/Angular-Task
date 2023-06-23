import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RoleComponent } from './role/role.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserComponent } from './user/user.component';
import { ItemComponent } from './item/item.component';
import { SaleComponent } from './sale/sale.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AnalyticComponent } from './analytic/analytic.component';
import { UserFormComponent } from './user/component/user-form/user-form.component';
import { ModalModule } from './modal/modal.module';
import { RoleFormComponent } from './role/components/role-form/role-form.component';
import { ItemFormComponent } from './item/components/item-form/item-form.component';

@NgModule({
  declarations: [
    AppComponent,
    RoleComponent,
    LoginComponent,
    DashboardComponent,
    UserComponent,
    ItemComponent,
    SaleComponent,
    AnalyticComponent,
    UserFormComponent,
    RoleFormComponent,
    ItemFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    ModalModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
