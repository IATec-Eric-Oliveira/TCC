import { Component, Input } from "@angular/core";
import { NgClass } from "@angular/common";

@Component({
  selector: "app-tags",
  standalone: true,
  imports: [NgClass],
  templateUrl: "./tags.component.html",
  styleUrl: "./tags.component.scss",
})
export class TagsComponent {
  @Input() customTag!: string;
  isSelected: boolean = false;

  select() {
    this.isSelected = !this.isSelected;
  }
}
