import { NgClass, NgIf } from "@angular/common";
import { Component } from "@angular/core";
import { HeaderComponent } from "../header/header.component";

@Component({
  selector: "app-tools-bar",
  standalone: true,
  imports: [NgClass, NgIf, HeaderComponent],
  templateUrl: "./tools-bar.component.html",
  styleUrl: "./tools-bar.component.scss",
})
export class ToolsBarComponent {
  open: boolean = false;
  openMeusLocais: boolean = false;

  abrir() {
    this.open = !this.open;
  }

  meusLocais() {
    this.openMeusLocais = !this.openMeusLocais;
  }
}
