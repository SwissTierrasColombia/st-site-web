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
  @Input() field: boolean = false;
  @Input() titleObservation: string;
  @Input() idObservation: string;
  @Input() observations: string;
  constructor(public activeModal: NgbActiveModal) {}
  ngOnInit(): void {}
  closeModal(value: boolean) {
    this.option = value;
    this.activeModal.close({ option: this.option, field: this.observations });
  }
}
