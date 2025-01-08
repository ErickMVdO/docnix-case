/**
 * Serviço respontável por validar os campos do formulário de cliente.
 * 
 * @author Erick Melo Vidal de Oliveira<erickmelovidal@gmail.com>
 * @since 1.0.0
 */

import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ClienteValidationService {

  /**
   * Método responsável por validar o campo cpf.
   * @param control AbstractControl
   * @returns ValidationErrors | null. Retorna { invalidCpf: true } para um cpf inválido e
   * null para um cpf válido.
   */
  cpfValidator(control: AbstractControl): ValidationErrors | null {
    const cpf = control.value;
    if (!cpf) {
      return null;
    }

    // Verifica se o cpf possui 11 dígitos
    const cpfClean = cpf.replace(/\D/g, '');
    if (cpfClean.length !== 11 || /^(\d)\1{10}$/.test(cpfClean)) {
      return { invalidCpf: true };
    }

    // Verifica se o primeiro dígito verificador é válido
    let sum = 0;
    for (let i = 0; i < 9; i++) {
      sum += parseInt(cpfClean.charAt(i)) * (10 - i);
    }
    let remainder = sum % 11;
    let firstDigit = remainder < 2 ? 0 : 11 - remainder;

    if (parseInt(cpfClean.charAt(9)) !== firstDigit) {
      return { invalidCpf: true };
    }

    // Verifica se o segundo dígito verificador é válido
    sum = 0;
    for (let i = 0; i < 10; i++) {
      sum += parseInt(cpfClean.charAt(i)) * (11 - i);
    }
    remainder = sum % 11;
    let secondDigit = remainder < 2 ? 0 : 11 - remainder;

    return parseInt(cpfClean.charAt(10)) === secondDigit ? null : { invalidCpf: true };
  }

  /**
   * Método responsável por validar o campo dataNascimento.
   * @param control AbstractControl
   * @returns ValidationErrors | null. 
   * Retorna { required: true } para o campo vazio,
   * { invalidDate: true } para uma data inválida e
   * null para um data válida.
   */
  dateValidator(control: AbstractControl): ValidationErrors | null {
    const today = new Date();
    const inputValue = control.value;
    const inputDate = new Date(inputValue);

    if (inputValue == "") {
      return { required: true };
    }

    if(inputValue == null){
      return { invalidDate: true };
    }
  
    if (inputDate > today) {
      return { invalidDate: true };
    }
  
    return null;
  }
}
