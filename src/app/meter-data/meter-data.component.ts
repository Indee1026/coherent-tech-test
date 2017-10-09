import { Component } from '@angular/core';

import { RemoteDataService } from '../../providers/remote-data-service/remote-data.service';

@Component({
  selector: 'ctt-meter-data',
  templateUrl: './meter-data.component.html'
})
export class MeterDataComponent {
  public meterReadings;
  isCollapsed: boolean[] = [];
  inEditMode: boolean[] = [];

  constructor (private service: RemoteDataService) {
    this.service
      .getData()
      .subscribe(val => {
        this.meterReadings = val;
      });
  }

  iconClicked(event) {
    const target = event.target,
      elementId = target.attributes.id,
      value = elementId.nodeValue;
    this.isCollapsed[value] = !this.isCollapsed[value];
  }

  toggleEditMode(event) {
    const target = event.target,
      elementId = target.attributes.id,
      value = elementId.nodeValue;
    this.inEditMode[value] = !this.inEditMode[value];
  }
}
