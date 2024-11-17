import { Component, OnDestroy, OnInit, Pipe } from "@angular/core";
import { LeafletModule } from "@asymmetrik/ngx-leaflet";
import * as Leaflet from "leaflet";
import { GarageAccreditedService } from "../../../../services/garage-accredited.service";
import { toObservable } from "@angular/core/rxjs-interop";
import { Subject, takeUntil } from "rxjs";
import { CommonModule } from "@angular/common";
import { MockService } from "../../../../services/mock.service";
import { RightClickDirective } from "../../../../directives/right-click.directive";
import { ClickOutsideDirective } from "../../../../directives/click-outside.directive";
import { AddLocalComponent } from "../add-local/add-local.component";

@Component({
  selector: "app-map",
  standalone: true,
  templateUrl: "./map.component.html",
  styleUrl: "./map.component.scss",
  imports: [
    LeafletModule,
    CommonModule,
    RightClickDirective,
    ClickOutsideDirective,
    AddLocalComponent,
  ],
})
export class MapComponent implements OnInit, OnDestroy {
  map!: Leaflet.Map;
  markers: Leaflet.Marker[] = [];
  options!: Leaflet.MapOptions;
  layers: Leaflet.Layer[] = [];
  center!: Leaflet.LatLng;
  hasChangePosition$ = toObservable(
    this.garageAccreditedService.hasChangePosition
  );
  zoom: number = 15;
  private subscriptions: Subject<boolean> = new Subject<boolean>();
  latitude!: number;
  longitude!: number;
  $latitude = toObservable(this.garageAccreditedService.garageLatitude);
  $longitude = toObservable(this.garageAccreditedService.garageLongitude);
  isModalOpen = false;
  modalX = 0;
  modalY = 0;
  isFormOpen = false;
  lat: number = -22.8854;
  lng: number = -47.2205;

  constructor(
    public garageAccreditedService: GarageAccreditedService,
    public mockService: MockService
  ) {
    this.center = Leaflet.latLng(
      this.garageAccreditedService.latitude(),
      this.garageAccreditedService.longitude() - 0.0085
    );
  }
  ngOnDestroy(): void {
    this.subscriptions.next(true);
    this.subscriptions.complete();
  }

  ngOnInit(): void {
    this.initMap();

    toObservable(this.garageAccreditedService.locationsMock).subscribe((locations) => {
      this.updateMarkers(locations);
    });

    this.hasChangePosition$
      .pipe(takeUntil(this.subscriptions))
      .subscribe((hasChangePosition) => {
        if (hasChangePosition) {
          this.loadMap();
        }
      });
    this.$latitude.pipe(takeUntil(this.subscriptions)).subscribe((latitude) => {
      this.latitude = latitude;
    });
    this.$longitude
      .pipe(takeUntil(this.subscriptions))
      .subscribe((longitude) => {
        this.longitude = longitude;
        this.recentralize();
      });
  }

  private initMap(): void {
    this.options = {
      layers: [
        Leaflet.tileLayer(
          "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
          {
            attribution:
              '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          }
        ),
      ],
      zoom: 15,
      zoomControl: false,
      center: Leaflet.latLng(
        this.garageAccreditedService.latitude(),
        this.garageAccreditedService.longitude() - 0.0085
      ),
    };
  }

  mapReady(map: Leaflet.Map) {
    map.addControl(Leaflet.control.zoom({ position: "bottomright" }));
    map.on("contextmenu", this.optionsMenu.bind(this));
  }

  loadMap() {
    this.center = Leaflet.latLng(
      this.garageAccreditedService.latitude(),
      this.garageAccreditedService.longitude() - 0.0085
    );
  }

  recentralize() {
    this.loadMap();
    this.center = Leaflet.latLng(this.latitude, this.longitude - 0.0085);
    this.zoom = 15;
  }

  homeButton() {
    this.center = Leaflet.latLng(
      this.garageAccreditedService.latitude(),
      this.garageAccreditedService.longitude()
    );
    this.zoom = 15;
    this.garageAccreditedService.isDetails.set(false);
    this.garageAccreditedService.selectedGarage.set(null);
  }

  optionsMenu(event: Leaflet.LeafletMouseEvent): void {
    this.lat = event.latlng.lat;
    this.lng = event.latlng.lng;
  }

  openModal(event: MouseEvent) {
    this.isModalOpen = true;

    this.modalX = event.clientX;
    this.modalY = event.clientY;
  }
  
  closeModal() {
    this.isModalOpen = false;
  }

  openFormLocal() {
    this.isFormOpen = true;
    this.isModalOpen = false;
  }

  closeFormLocal() {
    this.isFormOpen = false;
  }

  updateMarkers(locations: Leaflet.Marker<any>[]) {
    locations.forEach((marker) => {
      marker.addTo(this.map);
    });
  }
}
