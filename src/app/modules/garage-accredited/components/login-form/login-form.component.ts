import { NgIf } from "@angular/common";
import { Component, EventEmitter, Output } from "@angular/core";
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
  isLoading = false;

  @Output() onLoginStatusChange = new EventEmitter<boolean>();
  @Output() onClose = new EventEmitter<void>();

  constructor(private form: FormBuilder, private authService: AuthService) {
    this.formularioLogin = this.form.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(6)]],
    });
  }

  enviar(): void {
    this.isLoading = true;
    if (this.formularioLogin.valid) {
        const loginDto: LoginDto = {userName: this.formularioLogin.value.email, password: this.formularioLogin.value.password};

        this.authService.login(loginDto).subscribe(
            (response) => {
                this.authService.setToken(response.token);
                this.emitLoginStatus(true);
                this.closeForm();
                console.log('Login successful:', response.token);
            },
            (error) => {
                console.error('Login error', error);
            }
        );
        
    } else {
      console.log("Formulário inválido");
    }
    this.isLoading = false;
  }

  getErroCampo(campo: string): any {
    return this.formularioLogin.get(campo)?.errors;
  }

  private closeForm(): void {
    this.onClose.emit();
  }

  private emitLoginStatus(status: boolean): void {
    this.onLoginStatusChange.emit(status);
  }
}
