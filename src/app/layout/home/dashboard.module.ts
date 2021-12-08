import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbCarouselModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { StatModule } from '../../shared';
import { AboutComponent } from '../../sections/about/about.component';
import { TooltipModule } from 'ng2-tooltip-directive';
import { ComponentsModule } from 'src/app/shared/components/components.module';
@NgModule({
  imports: [
    CommonModule,
    NgbCarouselModule,
    NgbAlertModule,
    DashboardRoutingModule,
    StatModule,
    TooltipModule,
    ComponentsModule,
  ],
  declarations: [DashboardComponent, AboutComponent],
})
export class DashboardModule {}
