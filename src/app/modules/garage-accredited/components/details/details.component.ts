import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { GarageAccreditedService } from './../../../../services/garage-accredited.service';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [NgxMaskDirective, NgxMaskPipe, CommonModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss',
  providers: [provideNgxMask()],
})
export class DetailsComponent {
  constructor(public garageAccreditedService: GarageAccreditedService) {}

  googleMapsRouteLink() {
    return `https://www.google.com/maps/dir/${this.garageAccreditedService.latitude()},${this.garageAccreditedService.longitude()}/${
      this.garageAccreditedService.selectedPetStation()?.latitude
    },${this.garageAccreditedService.selectedPetStation()?.longitude}`;
  }
}
