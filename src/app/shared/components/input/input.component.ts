import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.sass'],
})
export class InputComponent implements OnInit {
  @Input() title: string;
  @Input() id: string;
  @Input() type: string;
  @Input() min: string;
  @Input() max: string;
  @Input() inputModel: number;
  @Output() inputModelChange = new EventEmitter<number>();
  constructor() {}
  ngOnInit(): void {}
}
