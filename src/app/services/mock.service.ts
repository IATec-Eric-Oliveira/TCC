import { PetStationSearchResult } from './../core/interfaces/pet-station-search-result';
import { Injectable, signal } from '@angular/core';
import * as Leaflet from 'leaflet';

@Injectable({
  providedIn: 'root',
})
export class MockService {
  constructor() {}

  locationsMock = signal<Leaflet.Marker<any>[] | undefined>([
    new Leaflet.Marker([-22.87138388187382, -47.22737536995465], {
      icon: Leaflet.icon({
        iconSize: [25, 41],
        iconAnchor: [13, 41],
        iconUrl: 'assets/marker-icon.png',
        shadowUrl: 'assets/marker-shadow.png',
      }),
    })
      .addEventListener('click', () => {
        let selectedPetStation: PetStationSearchResult = {
          id: 1,
          name: 'Hospital Veterinário Espaço Animal',
          address: 'Rua Doutor Carlos Guimarães, 100 - Jardim Chapadão, Campinas - SP, 13070-070',
          resume: 'Hospital veterinário com atendimento 24 horas, internação, cirurgias, exames, banho e tosa.',
          category: 'Hospital Veterinário',
          latitude: -22.87138388187382,
          longitude: -47.22737536995465
        }
      })
      .bindPopup(
      'Hospital Veterinário Espaço Animal',
      this.getTooltipUserOptions()
    ),
    new Leaflet.Marker([-22.881192124847747, -47.23103274910145], {
      icon: Leaflet.icon({
        iconSize: [25, 41],
        iconAnchor: [13, 41],
        iconUrl: 'assets/marker-icon.png',
        shadowUrl: 'assets/marker-shadow.png',
      }),
    })
      .addEventListener('click', () => {
        let selectedPetStation: PetStationSearchResult = {
          id: 2,
          name: 'São Francisco Hospital Veterinário',
          address: 'Rua Doutor Sampaio Ferraz, 123 - Cambuí, Campinas - SP, 13024-440',
          resume: 'Hospital veterinário com atendimento 24 horas, internação, cirurgias, exames, banho e tosa.',
          category: 'Hospital Veterinário',
          latitude: -22.881192124847747,
          longitude: -47.23103274910145
        }
      })
      .bindPopup(
      'São Francisco Hospital Veterinário',
      this.getTooltipUserOptions()
    ),
    new Leaflet.Marker([-22.865242928089614, -47.22096865364577], {
      icon: Leaflet.icon({
        iconSize: [25, 41],
        iconAnchor: [13, 41],
        iconUrl: 'assets/marker-icon.png',
        shadowUrl: 'assets/marker-shadow.png',
      }),
    })
      .addEventListener('click', () => {
        let selectedPetStation: PetStationSearchResult = {
          id: 3,
          name: 'Petz',
          address: 'Rua Doutor Sales de Oliveira, 1600 - Vila Industrial, Campinas - SP, 13035-270',
          resume: 'Pet shop com banho e tosa, consultório veterinário e venda de produtos para animais.',
          category: 'Parque',
          latitude: -22.865242928089614,
          longitude: -47.22096865364577
        }
      })
      .bindPopup(
      'Parque Socioambiental Chico Mendes',
      this.getTooltipUserOptions()
    ),
    new Leaflet.Marker([-22.88564801506282, -47.21305244055278], {
      icon: Leaflet.icon({
        iconSize: [25, 41],
        iconAnchor: [13, 41],
        iconUrl: 'assets/marker-icon.png',
        shadowUrl: 'assets/marker-shadow.png',
      }),
    }).bindPopup(
      'Lagoa da Fé',
      this.getTooltipUserOptions()
    ),
  ]);

  private getTooltipUserOptions(): Leaflet.TooltipOptions {
    return { direction: 'top', offset: [1, -42] };
  }
}
