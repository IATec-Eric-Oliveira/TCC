import { NgClass, NgIf } from "@angular/common";
import { Component } from "@angular/core";
import { HeaderComponent } from "../header/header.component";
import { trigger, transition, style, animate } from "@angular/animations";
import { ClickOutsideDirective } from "../../../../directives/click-outside.directive";

@Component({
  selector: "app-tools-bar",
  standalone: true,
  imports: [NgClass, NgIf, HeaderComponent, ClickOutsideDirective],
  templateUrl: "./tools-bar.component.html",
  styleUrl: "./tools-bar.component.scss",
  animations: [
    trigger("fadeInOut", [
      transition(":enter", [
        style({ opacity: 0 }),
        animate("500ms ease-in", style({ opacity: 1 })),
      ]),
    ]),
  ],
})
export class ToolsBarComponent {
  open: boolean = false;
  openMeusLocais: boolean = false;

  abrir() {
    this.open = !this.open;
  }

  fechar() {
    this.open = false;
  }

  meusLocais() {
    this.openMeusLocais = !this.openMeusLocais;
  }
}
