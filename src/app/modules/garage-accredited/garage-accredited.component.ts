import { Component } from "@angular/core";
import { MapComponent } from "./components/map/map.component";
import { SearchComponent } from "./components/search/search.component";
import { SidebarComponent } from "./components/sidebar/sidebar.component";
import { GarageAccreditedService } from "../../services/garage-accredited.service";
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from "@angular/animations";
import { HeaderComponent } from "./components/header/header.component";
import { ToolsBarComponent } from "./components/tools-bar/tools-bar.component";

@Component({
  selector: "app-garage-accredited",
  standalone: true,
  templateUrl: "./garage-accredited.component.html",
  styleUrl: "./garage-accredited.component.scss",
  imports: [
    MapComponent,
    SearchComponent,
    SidebarComponent,
    HeaderComponent,
    ToolsBarComponent,
  ],
  animations: [
    trigger("openClose", [
      // ...
      state(
        "open",
        style({
          opacity: 1,
          width: "100%",
        })
      ),
      state(
        "closed",
        style({
          opacity: 0,
          "background-color": "transparent",
          width: "0",
        })
      ),
      transition("open => closed", [
        animate("200ms ease-in-out", style({ opacity: 0 })),
      ]),
      transition("closed => open", [
        animate("5ms ease-in-out", style({ opacity: 0 })),
      ]),
    ]),
    trigger("openCloseSearchBar", [
      // ...
      state(
        "open",
        style({
          opacity: 1,
        })
      ),
      state(
        "closed",
        style({
          opacity: 0,
          "background-color": "transparent",
        })
      ),
      transition("open => closed", [
        animate("5ms ease-in-out", style({ opacity: 0 })),
      ]),
      transition("closed => open", [
        animate("200ms ease-in-out", style({ opacity: 0 })),
      ]),
    ]),
  ],
})
export class GarageAccreditedComponent {
  constructor(public garageAccreditedService: GarageAccreditedService) {}
}
