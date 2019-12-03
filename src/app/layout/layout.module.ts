import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';
import {
  FormsModule, ReactiveFormsModule
} from '@angular/forms';
import { FooterComponent } from './components/footer/footer.component';
import { RoleAdminGuard } from '../guards/role-admin-guard.service';
import { AuthGuard } from '../shared/guard/auth.guard';
import { RoleModel } from '../helpers/role.model';
@NgModule({
  imports: [
    CommonModule,
    LayoutRoutingModule,
    NgbDropdownModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    LayoutComponent,
    SidebarComponent,
    HeaderComponent,
    FooterComponent
  ],
  providers: [RoleModel, AuthGuard, RoleAdminGuard]
})
export class LayoutModule { }
