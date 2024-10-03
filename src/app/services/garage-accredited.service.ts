import { Injectable, signal, WritableSignal } from '@angular/core';
import { AccreditedGaragesSearch } from '../core/interfaces/accredited-garages-search.interface';
import { AccreditedGaragesSearchResult } from '../core/interfaces/accredited-garages-search-result.interface';
import * as Leaflet from 'leaflet';
import { PetStationSearchResult } from '../core/interfaces/pet-station-search-result';

@Injectable({
  providedIn: 'root',
})
export class GarageAccreditedService {
  accreditedGaragesList = signal<Array<AccreditedGaragesSearch> | null>(null);
  latitude = signal<number>(-15.83055);
  longitude = signal<number>(-47.90369);
  garageLatitude = signal<number>(-15.83055);
  garageLongitude = signal<number>(-47.90369);
  hasChangePosition: WritableSignal<boolean> = signal(false);
  suggestions: WritableSignal<Array<AccreditedGaragesSearchResult> | null> =
    signal(null);
  isDetails = signal<boolean>(false);
  filter = signal<string>('');
  locations = signal<Leaflet.Marker<any>[] | undefined>(undefined);
  selectedPetStation = signal<PetStationSearchResult | null>(null);
  selectedGarage = signal<AccreditedGaragesSearchResult | null>(null);
  center = signal<Leaflet.LatLng | null>(null);

  constructor() {}
}
