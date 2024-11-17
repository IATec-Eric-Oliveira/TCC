import { NgIf } from "@angular/common";
import { Component } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from "@angular/forms";
import { AuthService } from "../../../../services/auth.service";
import { LoginDto } from "../../../../dtos/User/LoginDto";

@Component({
  selector: "app-login-form",
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: "./login-form.component.html",
  styleUrl: "./login-form.component.scss",
})
export class LoginFormComponent {
  formularioLogin: FormGroup;

  constructor(private form: FormBuilder, private authService: AuthService) {
    this.formularioLogin = this.form.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(6)]],
    });
  }

  enviar(): void {
    if (this.formularioLogin.valid) {
        const loginDto: LoginDto = {userName: this.formularioLogin.value.email, password: this.formularioLogin.value.password};

        this.authService.login(loginDto).subscribe(
            (response) => {
                localStorage.setItem('authToken', response.token);
                console.log('Login successful:', response.token);
            },
            (error) => {
                console.error('Login error', error);
            }
        );
        
    } else {
      console.log("Formulário inválido");
    }
  }

  getErroCampo(campo: string): any {
    return this.formularioLogin.get(campo)?.errors;
  }
}
