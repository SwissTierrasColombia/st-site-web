import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SelectComponent } from './select/select.component';
import { ObservationComponent } from './observation/observation.component';

@NgModule({
  declarations: [SelectComponent, ObservationComponent],
  imports: [CommonModule, FormsModule],
  exports: [SelectComponent, ObservationComponent],
})
export class ComponentsModule {}
