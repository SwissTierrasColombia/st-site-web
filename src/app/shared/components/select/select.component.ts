import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { selectInterface } from '../../models/select.interface';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
})
export class SelectComponent implements OnInit {
  @Input() labelSelect: string;
  @Input() nameSelect: string;
  @Input() idSelect: string;
  @Input() optionZero: string;
  @Input() listSelect: any;
  @Input() key: any;
  @Output() eventAction = new EventEmitter();
  optionSelect: number;
  constructor() {
    this.listSelect = [];
    this.optionSelect = 0;
  }

  ngOnInit(): void {}
  _eventAction(): void {
    console.log(this.optionSelect);
    this.eventAction.emit({
      id: this.idSelect,
      select: this.optionSelect,
    } as selectInterface);
  }
}
