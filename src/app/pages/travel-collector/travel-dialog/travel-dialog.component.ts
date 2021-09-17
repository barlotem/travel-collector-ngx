import { Component, Input } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { Travel } from '../../../@core/models/Travel';

@Component({
  selector: 'ngx-travel-dialog',
  templateUrl: 'travel-dialog.component.html',
  styleUrls: ['travel-dialog.component.scss'],
})
export class TravelDialogComponent {

  @Input() travel: Travel;

  constructor(protected ref: NbDialogRef<TravelDialogComponent>) {}

  dismiss() {
    this.ref.close();
  }
}
