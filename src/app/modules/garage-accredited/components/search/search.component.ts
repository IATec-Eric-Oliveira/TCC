import { PetStationSearchResult } from './../../../../core/interfaces/pet-station-search-result';
import { Component, OnInit } from '@angular/core';
import {
  AutoCompleteModule,
  AutoCompleteSelectEvent,
} from 'primeng/autocomplete';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { AutoCompleteCompleteEvent } from '../../../../core/interfaces/auto-complete-event.interface';
import { AccreditedGaragesSearchResult } from '../../../../core/interfaces/accredited-garages-search-result.interface';
import { GarageAccreditedService } from '../../../../services/garage-accredited.service';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    AutoCompleteModule,
    FontAwesomeModule,
    FormsModule,
    NgxMaskDirective,
    NgxMaskPipe,
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
  providers: [provideNgxMask()],
})
export class SearchComponent implements OnInit {
  filter: string = '';
  suggestions: AccreditedGaragesSearchResult[] = [];
  accreditedGarages: any[] = [];
  faMagnifyingGlass = faMagnifyingGlass;
  isFocused: boolean = false;
  isFirstLoad: boolean = false;

  constructor(public garageAccreditedService: GarageAccreditedService) {}

  ngOnInit(): void {
    this.isFirstLoad = true;
    this.onCompleteFocus();
  }

  search(event: AutoCompleteCompleteEvent): AccreditedGaragesSearchResult[] {
    this.suggestions = [];
    this.garageAccreditedService.accreditedGaragesList()?.forEach((element) => {
      if (
        element.name
          ?.toLowerCase()
          .includes((event.query ?? '').toLowerCase()) ||
        element.address
          ?.toLowerCase()
          .includes((event.query ?? '').toLowerCase())
      ) {
        let accretidedGarage: AccreditedGaragesSearchResult = {
          id: element.id,
          name: element.name,
          address: element.address,
          phoneNumber: element.phoneNumber,
          email: element.email,
          distance:
            element.distance == null
              ? '0.0 km'
              : element.distance.toFixed(1) + ' km',
          latitude: element.latitude,
          longitude: element.longitude,
          technicalManager: element.technicalManager,
          attendance: element.attendance,
          accessibility: element.accessibility,
          regionalCouncil: element.regionalCouncil,
          typeOfProvider: element.typeOfProvider,
          notes: element.notes,
        };
        this.suggestions.push(accretidedGarage);
      }
    });
    return this.suggestions;
  }

  onFocus($event: Event) {
    this.isFocused = true;
  }

  onBlur($event: Event) {
    this.isFocused = false;
  }

  onCompleteFocus(): boolean {
    if (this.isFirstLoad) {
      this.isFirstLoad = false;
      return false;
    }

    return true;
  }

  onEnter($event: Event) {
    const target = $event.target as EventTarget & HTMLInputElement;
    const targetValue = target.value;
    this.garageAccreditedService.filter.set(targetValue);
    const autoComplete: AutoCompleteCompleteEvent = {
      originalEvent: $event,
      query: targetValue,
    };
    let suggestions = this.search(autoComplete);
    this.garageAccreditedService.suggestions.set(suggestions);
    this.garageAccreditedService.isDetails.set(true);
    this.garageAccreditedService.selectedPetStation.set(null);

  }

  onSelect($event: AutoCompleteSelectEvent) {
    this.garageAccreditedService.suggestions.set(this.search($event));
    this.garageAccreditedService.isDetails.set(true);
    this.garageAccreditedService.selectedPetStation.set($event.value);
    this.garageAccreditedService.garageLatitude.set($event.value.latitude);
    this.garageAccreditedService.garageLongitude.set($event.value.longitude);
  }

  onClear($event: Event | undefined) {
    this.garageAccreditedService.isDetails.set(false);
    this.garageAccreditedService.selectedGarage.set(null);
    this.garageAccreditedService.filter.set('');
    this.garageAccreditedService.suggestions.set(null);
  }
}
