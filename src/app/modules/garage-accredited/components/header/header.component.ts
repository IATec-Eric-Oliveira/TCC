import { NgIf, NgFor } from "@angular/common";
import { Component } from "@angular/core";
import { RegisterFormComponent } from "../register-form/register-form.component";
import { SearchComponent } from "../search/search.component";
import { TagsComponent } from "../tags/tags.component";
import { LoginFormComponent } from "../login-form/login-form.component";
import { ClickOutsideDirective } from "../../../../click-outside.directive";

@Component({
  selector: "app-header",
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    RegisterFormComponent,
    SearchComponent,
    TagsComponent,
    LoginFormComponent,
    ClickOutsideDirective,
  ],
  templateUrl: "./header.component.html",
  styleUrl: "./header.component.css",
})
export class HeaderComponent {
  tags = ["veterinário", "animais", "parques"];
  isModalOpen = false;
  isFormOpen = false;
  isRegister = false;

  toggleModal() {
    this.isModalOpen = !this.isModalOpen;
  }

  toggleForm() {
    this.isRegister = !this.isRegister;
  }

  login() {
    this.isFormOpen = true;
    this.isModalOpen = false;
    this.isRegister = false;
  }

  register() {
    this.isFormOpen = true;
    this.isModalOpen = false;
    this.isRegister = true;
  }

  closeModal() {
    this.isFormOpen = false;
  }

  onClickedOutside() {
    this.isModalOpen = false;
  }
}
