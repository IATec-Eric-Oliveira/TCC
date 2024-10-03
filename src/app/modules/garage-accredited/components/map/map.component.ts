import { Component, OnDestroy, OnInit, Pipe } from "@angular/core";
import { LeafletModule } from "@asymmetrik/ngx-leaflet";
import * as Leaflet from "leaflet";
import { GarageAccreditedService } from "../../../../services/garage-accredited.service";
import { toObservable } from "@angular/core/rxjs-interop";
import { Subject, takeUntil } from "rxjs";
import { CommonModule } from "@angular/common";
import { MockService } from "../../../../services/mock.service";

@Component({
  selector: "app-map",
  standalone: true,
  templateUrl: "./map.component.html",
  styleUrl: "./map.component.scss",
  imports: [LeafletModule, CommonModule],
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
}
