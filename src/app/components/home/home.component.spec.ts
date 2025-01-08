import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { ClienteComponent } from '../cliente/cliente.component';
import { PagamentoComponent } from '../pagamento/pagamento.component';
import { ModalComponent } from '../modal/modal.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import * as bootstrap from 'bootstrap';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HomeComponent,
        ClienteComponent,
        PagamentoComponent,
        ModalComponent,
        ReactiveFormsModule,
        FormsModule,
        BrowserAnimationsModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;

    component.clienteComponent = TestBed.createComponent(ClienteComponent).componentInstance;
    component.pagamentoComponent = TestBed.createComponent(PagamentoComponent).componentInstance;

    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  describe('gerarScore', () => {
    it('deve gerar um score aleatório entre 100 e 1000', () => {
      component.gerarScore();
      expect(component.score).toBeGreaterThanOrEqual(100);
      expect(component.score).toBeLessThanOrEqual(1000);
    });

    it('deve definir status como "Inapto" se o score for menor que 500', () => {
      spyOn(Math, 'random').and.returnValue(0.3);
      component.gerarScore();
      expect(component.status).toBe('Inapto');
    });

    it('deve definir status como "Apto com Limitações" se o score for entre 500 e 800', () => {
      spyOn(Math, 'random').and.returnValue(0.6);
      component.gerarScore();
      expect(component.status).toBe('Apto com Limitações');
    });

    it('deve definir status como "Apto" se o score for maior que 800', () => {
      spyOn(Math, 'random').and.returnValue(0.9);
      component.gerarScore();
      expect(component.status).toBe('Apto');
    });
  });

  describe('verificarFormulario', () => {
    it('deve marcar todos os campos como tocados', () => {
      spyOn(component.clienteComponent.dadosPessoaisForm, 'markAllAsTouched');
      spyOn(component.pagamentoComponent.pagamentoForm, 'markAllAsTouched');

      component.verificarFormulario();

      expect(component.clienteComponent.dadosPessoaisForm.markAllAsTouched).toHaveBeenCalled();
      expect(component.pagamentoComponent.pagamentoForm.markAllAsTouched).toHaveBeenCalled();
    });

    it('deve chamar mostrarModal se os formulários forem válidos', () => {
      spyOn(component, 'mostrarModal');
      component.clienteComponent.dadosPessoaisForm.setValue({
        nome: 'Teste',
        cpf: '123.456.789-09',
        email: 'teste@teste.com',
        dataNascimento: new Date('01/01/2000')
      });
      component.pagamentoComponent.pagamentoForm.setValue({
        numeroCartao: '1234123412341234',
        validade: '1225',
        cvv: '123',
      });

      component.verificarFormulario();
      expect(component.mostrarModal).toHaveBeenCalled();
    });

    it('não deve chamar mostrarModal se os formulários forem inválidos', () => {
      spyOn(component, 'mostrarModal');
      component.clienteComponent.dadosPessoaisForm.setValue({
        nome: '',
        cpf: '',
        email: '',
        dataNascimento: '',
      });
      component.pagamentoComponent.pagamentoForm.setValue({
        numeroCartao: '',
        validade: '',
        cvv: '',
      });

      component.verificarFormulario();
      expect(component.mostrarModal).not.toHaveBeenCalled();
    });
  });

  describe('mostrarModal', () => {
    it('deve gerar um novo score ao exibir o modal', () => {
      spyOn(component, 'gerarScore');
      spyOn(bootstrap.Modal.prototype, 'show');

      const modalElement = document.createElement('div');
      modalElement.id = 'exampleModal';
      document.body.appendChild(modalElement);

      component.mostrarModal();
      expect(component.gerarScore).toHaveBeenCalled();

      modalElement.remove();
    });

    it('não deve lançar erro se o modal não existir no DOM', () => {
      expect(() => component.mostrarModal()).not.toThrow();
    });
  });
});
