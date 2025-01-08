import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { provideMomentDateAdapter } from '@angular/material-moment-adapter';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { ClienteValidationService } from './cliente-validation.service';
import { CommonModule } from '@angular/common';

const CUSTOM_DATE_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MM/YYYY',
    dateA11yLabel: 'DD/MM/YYYY',
    monthYearA11yLabel: 'MM/YYYY',
  },
};
const ERROR_MESSAGES: Record<string, Record<string, string>> = {
  nome: { required: 'Este campo é obrigatório' },
  cpf: { required: 'Este campo é obrigatório', invalidCpf: 'CPF inválido' },
  email: { required: 'Este campo é obrigatório', email: 'E-mail inválido' },
  dataNascimento: { required: 'Este campo é obrigatório', invalidDate: 'Data inválida' },
};

@Component({
  selector: 'app-cliente',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatDatepickerModule,
    NgxMaskDirective,
  ],
  templateUrl: './cliente.component.html',
  styleUrl: './cliente.component.css',
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'pt-BR'},
    provideMomentDateAdapter(CUSTOM_DATE_FORMATS),
    provideNgxMask(),
  ]
})
export class ClienteComponent {
  dadosPessoaisForm: FormGroup;

  errorMensageName = '';
  errorMensageCpf = '';
  errorMensageEmail = '';
  errorMensageDate = '';

  constructor(
    private fb: FormBuilder, 
    private clienteValidationService: ClienteValidationService
  ) { 
    this.dadosPessoaisForm = this.fb.group({
      nome: ['', [Validators.required]],
      cpf: ['', [Validators.required, this.clienteValidationService.cpfValidator]],
      email: ['', [Validators.required, Validators.email]],
      dataNascimento: ['', [this.clienteValidationService.dateValidator]],
    });
  }

  private setErrorMessage(controlName: string, message: string): void {
    switch (controlName) {
      case 'nome':
        this.errorMensageName = message;
        break;
      case 'cpf':
        this.errorMensageCpf = message;
        break;
      case 'email':
        this.errorMensageEmail = message;
        break;
      case 'dataNascimento':
        this.errorMensageDate = message;
        break;
    }
  }

  inputHasError(controlName: string): boolean {
    const control = this.dadosPessoaisForm.get(controlName);

    if (!control) return false;

    const errors = control.errors;

    if (errors) {
      for (const errorKey in errors) {
        if (ERROR_MESSAGES[controlName]?.[errorKey]) {
          const message = ERROR_MESSAGES[controlName][errorKey];
          this.setErrorMessage(controlName, message);
          return true;
        }
      }
    }

    return false;
  }

}
