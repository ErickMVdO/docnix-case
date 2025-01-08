import { Component, ViewChild } from '@angular/core';
import { ClienteComponent } from '../cliente/cliente.component';
import { PagamentoComponent } from '../pagamento/pagamento.component';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { ModalComponent } from '../modal/modal.component';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    ClienteComponent, 
    ModalComponent,
    PagamentoComponent,
    MatButtonModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {

  @ViewChild(ClienteComponent) clienteComponent!: ClienteComponent;
  @ViewChild(PagamentoComponent) pagamentoComponent!: PagamentoComponent;

  score: number = 0;
  status: string = 'Inapto';

  private modalInstance: any;

  constructor() { }

  gerarScore(): void {
    this.score = Math.floor(Math.random() * (1000 - 100 + 1)) + 100;
    if (this.score < 500) {
      this.status = 'Inapto';
    } 
    else if (this.score >= 500 && this.score <= 800) {
      this.status = 'Apto com Limitações';
    }
    else {
      this.status = 'Apto';
    }
  }

  verificarFormulario(): void {
    this.clienteComponent.dadosPessoaisForm.markAllAsTouched();
    this.pagamentoComponent.pagamentoForm.markAllAsTouched();
    
    if (this.clienteComponent.dadosPessoaisForm.valid && this.pagamentoComponent.pagamentoForm.valid) {
      this.mostrarModal();
    }
  }

  mostrarModal(): void {
    this.gerarScore();
    const modalElement = document.getElementById('exampleModal');
    if (modalElement) {
      this.modalInstance = new bootstrap.Modal(modalElement);
      this.modalInstance.show();
    }
  }

}
