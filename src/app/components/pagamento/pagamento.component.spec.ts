import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { PagamentoComponent } from './pagamento.component';

describe('PagamentoComponent', () => {
  let component: PagamentoComponent;
  let fixture: ComponentFixture<PagamentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PagamentoComponent, ReactiveFormsModule, BrowserAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(PagamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  describe('Form Initialization', () => {
    it('deve inicializar o formulário com valores vazios', () => {
      const formValues = component.pagamentoForm.value;
      expect(formValues).toEqual({
        numeroCartao: '',
        validade: '',
        cvv: '',
      });
    });

    it('deve marcar o formulário como inválido ao iniciar', () => {
      expect(component.pagamentoForm.valid).toBeFalse();
    });
  });

  describe('Validations', () => {
    it('deve marcar o "numeroCartao" como inválido se estiver vazio', () => {
      const numeroCartaoControl = component.pagamentoForm.get('numeroCartao');
      numeroCartaoControl?.setValue('');
      expect(numeroCartaoControl?.valid).toBeFalse();
      expect(numeroCartaoControl?.errors?.['required']).toBeTrue();
    });

    it('deve marcar o "numeroCartao" como inválido se não tiver 16 dígitos', () => {
      const numeroCartaoControl = component.pagamentoForm.get('numeroCartao');
      numeroCartaoControl?.setValue('123456789');
      expect(numeroCartaoControl?.valid).toBeFalse();
    });

    it('deve marcar o "validade" como inválido se estiver vazio', () => {
      const validadeControl = component.pagamentoForm.get('validade');
      validadeControl?.setValue('');
      expect(validadeControl?.valid).toBeFalse();
      expect(validadeControl?.errors?.['required']).toBeTrue();
    });

    it('deve marcar o "validade" como inválido se o formato estiver incorreto', () => {
      const validadeControl = component.pagamentoForm.get('validade');
      validadeControl?.setValue('1325');
      expect(validadeControl?.valid).toBeFalse();
    });

    it('deve marcar o "cvv" como inválido se estiver vazio', () => {
      const cvvControl = component.pagamentoForm.get('cvv');
      cvvControl?.setValue('');
      expect(cvvControl?.valid).toBeFalse();
      expect(cvvControl?.errors?.['required']).toBeTrue();
    });

    it('deve marcar o "cvv" como inválido se não tiver 3 dígitos', () => {
      const cvvControl = component.pagamentoForm.get('cvv');
      cvvControl?.setValue('12');
      expect(cvvControl?.valid).toBeFalse();
    });

    it('deve marcar o formulário como válido quando todos os campos estiverem corretos', () => {
      component.pagamentoForm.setValue({
        numeroCartao: '1234567890123456',
        validade: '1225',
        cvv: '123',
      });
      expect(component.pagamentoForm.valid).toBeTrue();
    });
  });

  describe('Error Messages', () => {
    it('deve definir a mensagem de erro correta para o input "numeroCartao"', () => {
      const numeroCartaoControl = component.pagamentoForm.get('numeroCartao');

      numeroCartaoControl?.setValue('');
      numeroCartaoControl?.markAsTouched();
      expect(component.getErrorMessage('numeroCartao')).toEqual('Este campo é obrigatório');

      numeroCartaoControl?.setValue('123456');
      numeroCartaoControl?.markAsTouched();
      expect(component.getErrorMessage('numeroCartao')).toEqual('Formato inválido');
    });

    it('deve definir a mensagem de erro correta para o input "validade"', () => {
      const validadeControl = component.pagamentoForm.get('validade');

      validadeControl?.setValue('');
      validadeControl?.markAsTouched();
      expect(component.getErrorMessage('validade')).toEqual('Este campo é obrigatório');

      validadeControl?.setValue('1325');
      validadeControl?.markAsTouched();
      expect(component.getErrorMessage('validade')).toEqual('Data inválida');
    });

    it('deve definir a mensagem de erro correta para o input "cvv"', () => {
      const cvvControl = component.pagamentoForm.get('cvv');

      cvvControl?.setValue('');
      cvvControl?.markAsTouched();
      expect(component.getErrorMessage('cvv')).toEqual('Este campo é obrigatório');

      cvvControl?.setValue('12');
      cvvControl?.markAsTouched();
      expect(component.getErrorMessage('cvv')).toEqual('Formato inválido');
    });
  });

  describe('isFieldInvalid', () => {
    it('deve retornar true se o campo estiver inválido, tocado ou alterado', () => {
      const numeroCartaoControl = component.pagamentoForm.get('numeroCartao');
      numeroCartaoControl?.setValue('');
      numeroCartaoControl?.markAsTouched();
      expect(component.isFieldInvalid('numeroCartao')).toBeTrue();
    });

    it('deve retornar false se o campo estiver válido', () => {
      const numeroCartaoControl = component.pagamentoForm.get('numeroCartao');
      numeroCartaoControl?.setValue('1234567890123456');
      numeroCartaoControl?.markAsTouched();
      expect(component.isFieldInvalid('numeroCartao')).toBeFalse();
    });
  });
});
