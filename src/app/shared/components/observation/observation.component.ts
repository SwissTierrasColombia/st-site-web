import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-observation',
  templateUrl: './observation.component.html',
  styleUrls: ['./observation.component.scss'],
})
export class ObservationComponent implements OnInit {
  @Input() title: string;
  @Input() maxLength: number = 255;
  @Input() id: string;
  @Input() rows: number = 3;
  @Input() name: string;
  @Input() inputModel: string;
  @Input() disabled: boolean = false;
  @Output() inputModelChange = new EventEmitter<string>();
  constructor() {}

  ngOnInit(): void {}
}
