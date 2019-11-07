import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InsumosRoutingModule } from './insumos-routing.module';
import { CargueComponent } from './cargue/cargue.component';
import { PageHeaderModule } from 'src/app/shared';

@NgModule({
  declarations: [CargueComponent],
  imports: [CommonModule, PageHeaderModule, InsumosRoutingModule]
})
export class InsumosModule {}
