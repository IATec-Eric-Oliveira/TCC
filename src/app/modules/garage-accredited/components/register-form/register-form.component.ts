import { Component } from "@angular/core";
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidatorFn,
  Validators,
} from "@angular/forms";
import { NgIf } from "@angular/common";

interface UserForm {
  name: FormControl<string | null>;
  email: FormControl<string | null>;
  password: FormControl<string | null>;
  confirmPassword: FormControl<string | null>;
}

@Component({
  selector: "app-register-form",
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: "./register-form.component.html",
  styleUrl: "./register-form.component.css",
})
export class RegisterFormComponent {
  submited = false;

  formularioRegister!: FormGroup<UserForm>;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.formularioRegister = this.fb.group<UserForm>(
      {
        name: this.fb.control("", [
          Validators.required,
          Validators.minLength(2),
        ]),
        email: this.fb.control("", [Validators.required, Validators.email]),
        password: this.fb.control("", [
          Validators.required,
          Validators.minLength(8),
          this.validarSenha,
        ]),
        confirmPassword: this.fb.control("", Validators.required),
      },
      { validators: this.passwordMatchValidator }
    );
  }

  enviar() {
    this.submited = true;
    console.log(this.formularioRegister);
    // if (this.formularioRegister.valid) {
    //   console.log(this.formularioRegister.value);
    //   // Aqui você pode enviar os dados para o servidor
    // } else {
    //   // Marcar todos os campos como touched para exibir os erros
    //   Object.values(this.formularioRegister.controls).forEach((control) => {
    //     control.markAsTouched();
    //   });
    // }
  }

  //validators

  passwordMatchValidator: ValidatorFn = (
    control: AbstractControl
  ): { [key: string]: boolean } | null => {
    const password = control.get("password");
    const confirmPassword = control.get("confirmPassword");

    if (
      password &&
      confirmPassword &&
      password.value !== confirmPassword.value
    ) {
      return { passwordMismatch: true };
    }

    return null;
  };

  validarSenha: ValidatorFn = (
    control: AbstractControl
  ): { [key: string]: boolean } | null => {
    // var error = ;
    const valido =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d!@#$%^&*(),.?":{}|<>](?=.*[!@#$%^&*(),.?":{}|<>]){8,16}$/.test(
        control.value
      );
    return valido ? null : { passwordError: true };
  };

  getErroCampo(campo: string): any {
    return this.formularioRegister.get(campo)?.errors;
  }
}
