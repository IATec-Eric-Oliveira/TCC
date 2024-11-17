import { PetStationSearchResult } from "./../core/interfaces/pet-station-search-result";
import { Injectable, signal } from "@angular/core";
import * as Leaflet from "leaflet";
import { GarageAccreditedService } from "./garage-accredited.service";

@Injectable({
  providedIn: "root",
})
export class MockService {
  constructor(private garageAccreditedService: GarageAccreditedService) {}

  public createMocks(mocks: any) { 
    
  }
}
