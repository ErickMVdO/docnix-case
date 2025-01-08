import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ClienteComponent } from './cliente.component';
import { ClienteValidationService } from './cliente-validation.service';

describe('ClienteComponent', () => {
  let component: ClienteComponent;
  let fixture: ComponentFixture<ClienteComponent>;
  let clienteService: ClienteValidationService;

  beforeEach(async () => {
    
    await TestBed.configureTestingModule({
      imports: [ClienteComponent, BrowserAnimationsModule],
      providers: [ClienteValidationService],
    }).compileComponents();

    fixture = TestBed.createComponent(ClienteComponent);
    component = fixture.componentInstance;
    clienteService = TestBed.inject(ClienteValidationService);
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  describe('Form Initialization', () => {
    it('deve inicializar o form com valores vazios', () => {
      const formValues = component.dadosPessoaisForm.value;
      expect(formValues).toEqual({
        nome: '',
        cpf: '',
        email: '',
        dataNascimento: '',
      });
    });

    it('deve marcar o form como invalido ao iniciar', () => {
      expect(component.dadosPessoaisForm.valid).toBeFalse();
    });
  });

  describe('Validations', () => {
    it('deve marcar o "nome" como invalido se estiver vazio', () => {
      const nomeControl = component.dadosPessoaisForm.get('nome');
      nomeControl?.setValue('');
      expect(nomeControl?.valid).toBeFalse();
      expect(nomeControl?.errors?.['required']).toBeTrue();
    });

    it('deve marcar o "cpf" como invalido se estiver vazio', () => {
      const cpfControl = component.dadosPessoaisForm.get('cpf');
      cpfControl?.setValue('');
      expect(cpfControl?.valid).toBeFalse();
      expect(cpfControl?.errors?.['required']).toBeTrue();
    });
    
    it('deve verificar um cpf inválido usando o cpfValidator', () => {
      const cpfControl = component.dadosPessoaisForm.get('cpf');

      cpfControl?.setValue('123.456.789-00');
      expect(clienteService.cpfValidator(cpfControl!)).toEqual({ invalidCpf: true });
    });

    it('deve verificar um cpf válido usando o cpfValidator', () => {
      const cpfControl = component.dadosPessoaisForm.get('cpf');

      cpfControl?.setValue('123.456.789-09');
      expect(clienteService.cpfValidator(cpfControl!)).toBeNull();
    });

    it('deve verificar se o email é válido', () => {
      const emailControl = component.dadosPessoaisForm.get('email');
      emailControl?.setValue('invalid-email');
      expect(emailControl?.valid).toBeFalse();
      expect(emailControl?.errors?.['email']).toBeTrue();
    });

    it('deve marcar o "data de nascimento" como invalido se estiver vazio', () => {
      const dataNascimentoControl = component.dadosPessoaisForm.get('dataNascimento');
      dataNascimentoControl?.setValue('');
      expect(dataNascimentoControl?.valid).toBeFalse();
      expect(dataNascimentoControl?.errors?.['required']).toBeTrue();
    });

    it('deve verificar uma data de nascimento válida usando o dateValidator', () => {
      const dataNascimentoControl = component.dadosPessoaisForm.get('dataNascimento');
      const validDate = new Date('01/01/2000');

      dataNascimentoControl?.setValue(validDate);
      expect(clienteService.dateValidator(dataNascimentoControl!)).toBeNull();
    });

    it('deve verificar uma data de nascimento inválida usando o dateValidator', () => {
      const dataNascimentoControl = component.dadosPessoaisForm.get('dataNascimento');

      dataNascimentoControl?.setValue(null);
      expect(clienteService.dateValidator(dataNascimentoControl!)).toEqual({ invalidDate: true });
    });

    it('deve verificar uma data de nascimento posterior a data atual usando o dateValidator', () => {
      const dataNascimentoControl = component.dadosPessoaisForm.get('dataNascimento');
      const today = new Date();
      const nextDate = new Date(today);
      nextDate.setDate(today.getDate() + 1);
      
      dataNascimentoControl?.setValue(nextDate);
      expect(clienteService.dateValidator(dataNascimentoControl!)).toEqual({ invalidDate: true });
    });
  });

  describe('Error Message Handling', () => {
    it('deve definir a mensagem de erro correta para o input "nome"', () => {
      const nomeControl = component.dadosPessoaisForm.get('nome') as FormControl;
      nomeControl.setValue('');
      nomeControl.markAsTouched();
      component.inputHasError('nome');
      expect(component.errorMensageName).toEqual('Este campo é obrigatório');
    });

    it('deve definir a mensagem de erro correta para o input "email"', () => {
      const emailControl = component.dadosPessoaisForm.get('email') as FormControl;
      
      emailControl.setValue('');
      emailControl.markAsTouched();
      component.inputHasError('email');
      expect(component.errorMensageEmail).toEqual('Este campo é obrigatório');

      emailControl.setValue('invalid-email');
      emailControl.markAsTouched();
      component.inputHasError('email');
      expect(component.errorMensageEmail).toEqual('E-mail inválido');
    });

    it('deve definir a mensagem de erro correta para o input "cpf"', () => {
      const cpfControl = component.dadosPessoaisForm.get('cpf') as FormControl;

      cpfControl.setValue('');
      cpfControl.markAsTouched();
      component.inputHasError('cpf');
      expect(component.errorMensageCpf).toEqual('Este campo é obrigatório');

      cpfControl.setValue('123.456.789-00');
      cpfControl.markAsTouched();
      component.inputHasError('cpf');
      expect(component.errorMensageCpf).toEqual('CPF inválido');
    });

    it('deve definir a mensagem de erro correta para o input "dataNascimento"', () => {
      const dataNascimentoControl = component.dadosPessoaisForm.get('dataNascimento') as FormControl;
      
      dataNascimentoControl.setValue('');
      dataNascimentoControl.markAsTouched();
      component.inputHasError('dataNascimento');
      expect(component.errorMensageDate).toEqual('Este campo é obrigatório');

      dataNascimentoControl.setValue(null);
      dataNascimentoControl.markAsTouched();
      component.inputHasError('dataNascimento');
      expect(component.errorMensageDate).toEqual('Data inválida');

      const today = new Date();
      const nextDate = new Date(today);
      nextDate.setDate(today.getDate() + 1);
      dataNascimentoControl.setValue(nextDate);
      dataNascimentoControl.markAsTouched();
      component.inputHasError('dataNascimento');
      expect(component.errorMensageDate).toEqual('Data inválida');
    });
  });

  describe('Form Submission', () => {
    it('deve marcar o form como valido quando todos os campos estiverem corretos', () => {
      component.dadosPessoaisForm.setValue({
        nome: 'Teste',
        cpf: '123.456.789-09',
        email: 'teste@teste.com',
        dataNascimento: new Date('01/01/2000'),
      });
      expect(component.dadosPessoaisForm.valid).toBeTrue();
    });
  });
});
