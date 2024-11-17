import { MockService } from './services/mock.service';
import { AccreditedGaragesSearchResult } from './core/interfaces/accredited-garages-search-result.interface';
import { ChangeDetectionStrategy, Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpService } from './services/http.service';
import { AccreditedGaragesParameters } from './core/interfaces/parameters/accredited-garages.parameters';
import { GarageAccreditedService } from './services/garage-accredited.service';
import { GarageAccreditedComponent } from './modules/garage-accredited/garage-accredited.component';
import * as Leaflet from 'leaflet';
import { PetStationSearchResult } from './core/interfaces/pet-station-search-result';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [RouterOutlet, FontAwesomeModule, GarageAccreditedComponent, JsonPipe],
})
export class AppComponent implements OnInit {
  public test: any;
  private userLocationMarker: Leaflet.Marker<any> | undefined;
  protected accreditedGaragesParameters?: AccreditedGaragesParameters;

  constructor(
    private httpService: HttpService,
    private garageAccreditedService: GarageAccreditedService,
    private mockService: MockService
  ) {}

  ngOnInit() {
    this.getPosition();
    this.initializeMarkers();
  }

  initializeMarkers() {
    const initialMarkers = [
      new Leaflet.Marker([-22.87138388187382, -47.22737536995465], {
        icon: Leaflet.icon({
          iconSize: [25, 41],
          iconAnchor: [13, 41],
          iconUrl: "assets/marker-icon.png",
          shadowUrl: "assets/marker-shadow.png",
        }),
      })
        .addEventListener("click", () => {
          let selectedPetStation: PetStationSearchResult = {
            id: 1,
            name: "Hospital Veterinário Espaço Animal",
            address:
              "Rua Doutor Carlos Guimarães, 100 - Jardim Chapadão, Campinas - SP, 13070-070",
            resume:
              "Hospital veterinário com atendimento 24 horas, internação, cirurgias, exames, banho e tosa.",
            category: "Hospital Veterinário",
            latitude: -22.87138388187382,
            longitude: -47.22737536995465,
          };
          this.garageAccreditedService.isDetails.set(false);
          this.garageAccreditedService.selectedGarage.set(null);
          this.garageAccreditedService.selectedPetStation.set(selectedPetStation);
          this.garageAccreditedService.isDetails.set(true);
        })
        .bindTooltip(
          "Hospital Veterinário Espaço Animal",
          this.getTooltipUserOptions()
        ),
      new Leaflet.Marker([-22.881192124847747, -47.23103274910145], {
        icon: Leaflet.icon({
          iconSize: [25, 41],
          iconAnchor: [13, 41],
          iconUrl: "assets/marker-icon.png",
          shadowUrl: "assets/marker-shadow.png",
        }),
      })
        .addEventListener("click", () => {
          let selectedPetStation: PetStationSearchResult = {
            id: 2,
            name: "São Francisco Hospital Veterinário",
            address:
              "Rua Doutor Sampaio Ferraz, 123 - Cambuí, Campinas - SP, 13024-440",
            resume:
              "Hospital veterinário com atendimento 24 horas, internação, cirurgias, exames, banho e tosa.",
            category: "Hospital Veterinário",
            latitude: -22.881192124847747,
            longitude: -47.23103274910145,
          };
          this.garageAccreditedService.isDetails.set(false);
          this.garageAccreditedService.selectedGarage.set(null);
          this.garageAccreditedService.selectedPetStation.set(selectedPetStation);
          this.garageAccreditedService.isDetails.set(true);
        })
        .bindTooltip(
          "São Francisco Hospital Veterinário",
          this.getTooltipUserOptions()
        ),
      new Leaflet.Marker([-22.865242928089614, -47.22096865364577], {
        icon: Leaflet.icon({
          iconSize: [25, 41],
          iconAnchor: [13, 41],
          iconUrl: "assets/marker-icon.png",
          shadowUrl: "assets/marker-shadow.png",
        }),
      })
        .addEventListener("click", () => {
          let selectedPetStation: PetStationSearchResult = {
            id: 3,
            name: "Petz",
            address:
              "Rua Doutor Sales de Oliveira, 1600 - Vila Industrial, Campinas - SP, 13035-270",
            resume:
              "Pet shop com banho e tosa, consultório veterinário e venda de produtos para animais.",
            category: "Parque",
            latitude: -22.865242928089614,
            longitude: -47.22096865364577,
          };
          this.garageAccreditedService.isDetails.set(false);
          this.garageAccreditedService.selectedGarage.set(null);
          this.garageAccreditedService.selectedPetStation.set(selectedPetStation);
          this.garageAccreditedService.isDetails.set(true);
        })
        .bindTooltip(
          "Parque Socioambiental Chico Mendes",
          this.getTooltipUserOptions()
        ),
      new Leaflet.Marker([-22.88564801506282, -47.21305244055278], {
        icon: Leaflet.icon({
          iconSize: [25, 41],
          iconAnchor: [13, 41],
          iconUrl: "assets/marker-icon.png",
          shadowUrl: "assets/marker-shadow.png",
        }),
      }).bindTooltip("Lagoa da Fé", this.getTooltipUserOptions()),
    ];

    this.userLocationMarker = Leaflet.marker(
      [
        this.garageAccreditedService.latitude(),
        this.garageAccreditedService.longitude(),
      ],
      {
        icon: Leaflet.icon({
          iconSize: [25, 41],
          iconAnchor: [13, 41],
          iconUrl: 'assets/marker-icon.png',
          shadowUrl: 'assets/marker-shadow.png',
        }),
      }
    ).bindTooltip('Você está aqui', this.getTooltipUserOptions());

    initialMarkers.push(this.userLocationMarker);

    this.garageAccreditedService.initializeLocationsMock(initialMarkers);
  }

  getPosition() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.garageAccreditedService.latitude.set(position.coords.latitude);
      this.garageAccreditedService.longitude.set(position.coords.longitude);
      this.garageAccreditedService.hasChangePosition.set(true);
      this.updateUserLocationMarker(position.coords.latitude, position.coords.longitude);
    });
  }

  updateUserLocationMarker(lat: number, lng: number) {
    if (this.userLocationMarker) {
      this.userLocationMarker.setLatLng([lat, lng]);
    }
  }

  private getTooltipUserOptions(): Leaflet.TooltipOptions {
    return { direction: 'top', offset: [1, -42] };
  }
}
