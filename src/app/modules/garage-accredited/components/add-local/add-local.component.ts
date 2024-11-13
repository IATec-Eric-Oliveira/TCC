import { NgIf } from "@angular/common";
import { Component, Input } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import * as L from "leaflet";

interface UserForm {
  nome: FormControl<string | null>;
  categoria: FormControl<Array<String> | null>;
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
  map: any;
  centerCoords!: L.LatLng;

  formularioLocal!: FormGroup<UserForm>;
  submited = false;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.centerCoords = new L.LatLng(this.lat, this.lng);

    this.formularioLocal = this.fb.group<UserForm>({
      nome: this.fb.control("", [Validators.required, Validators.minLength(2)]),
      categoria: this.fb.control([""], [Validators.required]),
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

    // if (this.formularioLocal.valid) {
    //   console.log(this.formularioLocal.value);
    //   // Aqui você pode enviar os dados para o servidor
    // } else {
    //   // Marcar todos os campos como touched para exibir os erros
    //   Object.values(this.formularioLocal.controls).forEach((control) => {
    //     control.markAsTouched();
    //   });
    // }
  }

  //validators
  getErroCampo(campo: string): any {
    return this.formularioLocal.get(campo)?.errors;
  }
}
