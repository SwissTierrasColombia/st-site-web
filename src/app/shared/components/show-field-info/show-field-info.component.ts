import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-show-field-info',
  templateUrl: './show-field-info.component.html',
  styleUrls: ['./show-field-info.component.scss'],
})
export class ShowFieldInfoComponent implements OnInit {
  @Input() title: string;
  @Input() info: string;
  constructor() {}

  ngOnInit(): void {}
}
