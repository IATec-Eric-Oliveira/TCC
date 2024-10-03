import { NgClass } from "@angular/common";
import { Component } from "@angular/core";

@Component({
  selector: "app-tools-bar",
  standalone: true,
  imports: [NgClass],
  templateUrl: "./tools-bar.component.html",
  styleUrl: "./tools-bar.component.scss",
})
export class ToolsBarComponent {
  open: boolean = false;

  abrir() {
    this.open = !this.open;
  }
}
