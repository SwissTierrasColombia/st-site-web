import { CheckboxComponent } from './checkbox/checkbox.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SelectComponent } from './select/select.component';
import { ObservationComponent } from './observation/observation.component';
import { ModalComponent } from './modal/modal.component';
import { InputComponent } from './input/input.component';
@NgModule({
  declarations: [
    SelectComponent,
    ObservationComponent,
    ModalComponent,
    InputComponent,
    CheckboxComponent,
  ],
  imports: [CommonModule, FormsModule],
  exports: [
    SelectComponent,
    ObservationComponent,
    ModalComponent,
    InputComponent,
    CheckboxComponent,
  ],
})
export class ComponentsModule {}
