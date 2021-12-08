import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.sass'],
})
export class InputComponent implements OnInit {
  @Input() title: string;
  @Input() id: string;
  @Input() type: string = 'text';
  @Input() name: string = 'name';
  @Input() placeholder: string = '';
  @Input() min: string;
  @Input() max: string;
  @Input() classStyle: string;
  @Input() inputModel: any;
  @Input() disabled: boolean = false;
  @Input() icon: string;
  @Output() inputModelChange = new EventEmitter<any>();
  constructor() {}
  ngOnInit(): void {}
}
