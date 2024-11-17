import { NgIf } from "@angular/common";
import { Component, EventEmitter, Input, Output, signal } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import * as L from "leaflet";
import { PetStationSearchResult } from "../../../../core/interfaces/pet-station-search-result";
import { GarageAccreditedService } from "../../../../services/garage-accredited.service";

interface UserForm {
  nome: FormControl<string | null>;
  categoria: FormControl<string | null>;
  endereco: FormControl<string | null>;
  latitude: FormControl<string | null>;
  longitude: FormControl<string | null>;
}

@Component({
  selector: "app-add-local",
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: "./add-local.component.html",
  styleUrl: "./add-local.component.scss",
})
export class AddLocalComponent {
  @Input() lat!: number;
  @Input() lng!: number;
  @Output() closeFormEvent = new EventEmitter<void>();
  
  map: any;
  centerCoords!: L.LatLng;
  petStation: PetStationSearchResult | null = null;
  formularioLocal!: FormGroup<UserForm>;
  submited = false;

  constructor(private fb: FormBuilder,
    private garageAccreditedService: GarageAccreditedService) {
    }

  ngOnInit() {
    this.centerCoords = new L.LatLng(this.lat, this.lng);

    this.formularioLocal = this.fb.group<UserForm>({
      nome: this.fb.control("", [Validators.required, Validators.minLength(2)]),
      categoria: this.fb.control("", [Validators.required]),
      endereco: this.fb.control("", [Validators.required]),
      latitude: this.fb.control(""),
      longitude: this.fb.control(""),
    });

    this.configMap();

    this.map.on("move", () => {
      this.updateCenterCoords();
    });
  }

  configMap() {
    console.log(`Latitude: ${this.lat}, Longitude: ${this.lng}`);
    this.map = L.map("map2", {
      center: this.centerCoords,
      zoom: 15,
    });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.map);
  }

  updateCenterCoords(): void {
    this.centerCoords = this.map.getCenter();
  }

  enviar() {
    this.submited = true;

    let formData = this.formularioLocal.value;

    formData["latitude"] = "" + this.centerCoords.lat;
    formData["longitude"] = "" + this.centerCoords.lng;
    console.log(this.formularioLocal.value);

    if (this.formularioLocal.valid) { 
      this.addLocation();
      this.closeFormEvent.emit();
    }
  }

  addLocation() {
    const newMarker = new L.Marker([this.lat, this.lng], {
      icon: L.icon({
        iconSize: [25, 41],
        iconAnchor: [13, 41],
        iconUrl: 'assets/marker-icon.png',
        shadowUrl: 'assets/marker-shadow.png',
      }),
    }).addEventListener('click', () => {
      let selectedPetStation: PetStationSearchResult = {
        id: 3,
        name: this.formularioLocal.value.nome!,
        address: this.formularioLocal.value.endereco!,
        resume: ' ',
        category: this.formularioLocal.value.categoria!,
        latitude: this.lat,
        longitude: this.lng,
      };

      this.garageAccreditedService.isDetails.set(false);
      this.garageAccreditedService.selectedGarage.set(null);
      this.garageAccreditedService.selectedPetStation.set(selectedPetStation);
      this.garageAccreditedService.isDetails.set(true);
    }).bindTooltip(this.formularioLocal.value.nome!, this.getTooltipUserOptions());

    // Adiciona o novo marcador ao serviço
    this.garageAccreditedService.addLocationMock(newMarker);
  }

  //validators
  getErroCampo(campo: string): any {
    return this.formularioLocal.get(campo)?.errors;
  }

  private getTooltipUserOptions(): L.TooltipOptions {
    return { direction: 'top', offset: [1, -42] };
  }
}
