import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.sass'],
})
export class CheckboxComponent implements OnInit, OnChanges {
  @Input() title: string;
  @Input() id: string;
  @Input() name: string = 'checkbox';
  @Input() type: string = 'checkbox';
  @Input() classStyle: string;
  @Input() inputModel: any;
  @Input() disabled: boolean = false;
  @Output() inputModelChange = new EventEmitter<any>();
  constructor() {}
  ngOnChanges(changes: SimpleChanges): void {
    if (changes) {
      if (changes.inputModel) {
        this.inputModel = changes.inputModel.currentValue;
        this.inputModelChange.emit(this.inputModel);
      }
    }
  }
  ngOnInit(): void {}
}
