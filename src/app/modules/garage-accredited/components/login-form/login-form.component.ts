import { NgIf } from "@angular/common";
import { Component } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from "@angular/forms";

@Component({
  selector: "app-login-form",
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: "./login-form.component.html",
  styleUrl: "./login-form.component.scss",
})
export class LoginFormComponent {
  formularioLogin: FormGroup;

  constructor(private form: FormBuilder) {
    this.formularioLogin = this.form.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(6)]],
    });
  }

  enviar(): void {
    if (this.formularioLogin.valid) {
      console.log(this.formularioLogin.value);
      // Aqui você pode enviar os dados para o backend
    } else {
      console.log("Formulário inválido");
    }
  }

  getErroCampo(campo: string): any {
    return this.formularioLogin.get(campo)?.errors;
  }
}
