import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FooterComponent } from './components/footer/footer.component';
import { RoleAdminGuard } from '../guards/role-admin-guard.service';
import { AuthGuard } from '../shared/guard/auth.guard';
import { RoleModel } from '../helpers/role.model';
import { RoleManagerGuard } from '../guards/role-manager-guard.service';
import { RoleProviderGuard } from '../guards/role-provider-guard.service';
import { RoleOperatorGuard } from '../guards/role-operator-guard.service';
import { RoleAdminManagerGuard } from '../guards/role-admin-manager-guard.service';
import { AdministrationGuard } from '../guards/administration-guard.service';
import { RoleProviderDirectorGuard } from '../guards/role-providerDirector-guard.service';
import { RoleRevisorGuard } from '../guards/role-revisor-guard.service';

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
    FooterComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    RoleModel,
    AuthGuard,
    RoleAdminGuard,
    RoleManagerGuard,
    RoleProviderGuard,
    RoleOperatorGuard,
    RoleAdminManagerGuard,
    AdministrationGuard,
    RoleProviderDirectorGuard,
    RoleRevisorGuard,
  ],
})
export class LayoutModule {}
