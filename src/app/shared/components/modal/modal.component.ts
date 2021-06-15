import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  @Input() title: String;
  @Input() description: String;
  @Input() option: boolean = false;
  @Input() disableButtonClose: boolean = false;
  constructor(public activeModal: NgbActiveModal) {}
  ngOnInit(): void {}
  closeModal(value: boolean) {
    this.option = value;
    this.activeModal.close({ option: this.option });
  }
}
