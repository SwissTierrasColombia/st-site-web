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
  @Input() inputModel: string;
  @Output() inputModelChange = new EventEmitter<string>();
  constructor() {}
  ngOnInit(): void {}
}
