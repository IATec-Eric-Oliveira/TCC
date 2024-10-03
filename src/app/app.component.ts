import { MockService } from './services/mock.service';
import { AccreditedGaragesSearchResult } from './core/interfaces/accredited-garages-search-result.interface';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpService } from './services/http.service';
import { AccreditedGaragesParameters } from './core/interfaces/parameters/accredited-garages.parameters';
import { GarageAccreditedService } from './services/garage-accredited.service';
import { GarageAccreditedComponent } from './modules/garage-accredited/garage-accredited.component';
import * as Leaflet from 'leaflet';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [RouterOutlet, FontAwesomeModule, GarageAccreditedComponent],
})
export class AppComponent implements OnInit {
  protected accreditedGaragesParameters?: AccreditedGaragesParameters;

  constructor(
    private httpService: HttpService,
    private garageAccreditedService: GarageAccreditedService,
    private mockService: MockService
  ) {}

  ngOnInit() {
    this.getPosition();
    this.searchPetPlace();
  }

  getPosition() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.garageAccreditedService.latitude.set(position.coords.latitude);
      this.garageAccreditedService.longitude.set(position.coords.longitude);
      this.garageAccreditedService.hasChangePosition.set(true);
      this.searchPetPlace();
    });
  }

  searchPetPlace() {
    this.accreditedGaragesParameters = {
      latitude: this.garageAccreditedService.latitude().toString(),
      longitude: this.garageAccreditedService.longitude().toString(),
    };

    this.mockService.locationsMock()?.push(
      Leaflet.marker(
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
      ).bindTooltip('Você está aqui', this.getTooltipUserOptions())
    );

    // this.httpService
    //   .getAccreditedGarages(this.accreditedGaragesParameters)
    //   .subscribe((data) => {
    //     this.garageAccreditedService.accreditedGaragesList.set(data);
    //     let locations = data.map((garage) => {
    //       var marker = Leaflet.marker([garage.latitude, garage.longitude], {
    //         icon: Leaflet.icon({
    //           iconSize: [45, 61],
    //           iconAnchor: [13, 41],
    //           iconUrl: '../assets/images/garage-accredited-icon.svg',
    //         }),
    //       })
    //         .addEventListener('click', () => {
    //           let acreditedeGarage: AccreditedGaragesSearchResult = {
    //             id: garage.id,
    //             name: garage.name,
    //             address: garage.address,
    //             phoneNumber: garage.phoneNumber,
    //             email: garage.email,
    //             distance:
    //               garage.distance == null
    //                 ? '0.0 km'
    //                 : garage.distance.toFixed(1) + ' km',
    //             latitude: garage.latitude,
    //             longitude: garage.longitude,
    //             technicalManager: garage.technicalManager,
    //             attendance: garage.attendance,
    //             accessibility: garage.accessibility,
    //             regionalCouncil: garage.regionalCouncil,
    //             typeOfProvider: garage.typeOfProvider,
    //             notes: garage.notes,
    //           };
    //           this.garageAccreditedService.isDetails.set(false);
    //           this.garageAccreditedService.selectedGarage.set(null);
    //           this.garageAccreditedService.selectedGarage.set(acreditedeGarage);
    //           this.garageAccreditedService.filter.set(
    //             acreditedeGarage.name ?? ''
    //           );
    //           this.garageAccreditedService.isDetails.set(true);
    //           this.garageAccreditedService.garageLatitude.set(
    //             acreditedeGarage.latitude ?? -15.83055
    //           );
    //           this.garageAccreditedService.garageLongitude.set(
    //             acreditedeGarage.longitude ?? -47.90369
    //           );
    //         })
    //         .bindTooltip(garage.name || '', this.getTooltipGaragesOptions());

    //       return marker;
    //     });

    //     locations.push(
    //       Leaflet.marker(
    //         [
    //           this.garageAccreditedService.latitude(),
    //           this.garageAccreditedService.longitude(),
    //         ],
    //         {
    //           icon: Leaflet.icon({
    //             iconSize: [25, 41],
    //             iconAnchor: [13, 41],
    //             iconUrl: 'assets/marker-icon.png',
    //             shadowUrl: 'assets/marker-shadow.png',
    //           }),
    //         }
    //       ).bindTooltip('Você está aqui', this.getTooltipUserOptions())
    //     );
    //     this.garageAccreditedService.locations.set(locations);
    //   });

    var locations = new Leaflet.Marker(
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
    // this.garageAccreditedService.locations.set(locations);
  }

  private getTooltipGaragesOptions(): Leaflet.TooltipOptions {
    return { direction: 'top', offset: [10, -42] };
  }

  private getTooltipUserOptions(): Leaflet.TooltipOptions {
    return { direction: 'top', offset: [1, -42] };
  }
}
