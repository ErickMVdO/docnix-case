import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';

@Component({
  selector: 'app-pagamento',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    NgxMaskDirective,
  ],
  templateUrl: './pagamento.component.html',
  styleUrl: './pagamento.component.css',
  providers: [provideNgxMask()]
})
export class PagamentoComponent {
  pagamentoForm: FormGroup;

  constructor(private fb: FormBuilder) { 
    this.pagamentoForm = this.fb.group({
      numeroCartao: ['', [Validators.required, Validators.pattern(/^\d{16}$/)]],
      validade: ['', [Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])\d{2}$/)]],
      cvv: ['', [Validators.required, Validators.pattern(/^\d{3}$/)]],
    });
  }

  isFieldInvalid(fieldName: string): boolean | undefined {
    const field = this.pagamentoForm.get(fieldName);
    return field?.invalid && (field?.touched || field?.dirty);
  }

  getErrorMessage(fieldName: string): string {
    const field = this.pagamentoForm.get(fieldName);
    
    if (field?.hasError('required')) {
      return 'Este campo é obrigatório';
    }
    if (fieldName === 'validade' && field?.hasError('pattern')) {
      return 'Data inválida';
    }
    if (field?.hasError('pattern')) {
      return 'Formato inválido';
    }
    return '';
  }

}
