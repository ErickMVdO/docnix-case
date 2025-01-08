import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalComponent } from './modal.component';

describe('ModalComponent', () => {
  let component: ModalComponent;
  let fixture: ComponentFixture<ModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnChanges', () => {
    it('deve definir a classe como "text-success" quando o status for "Apto"', () => {
      component.status = 'Apto';
      component.ngOnChanges();
      expect(component.statusClass).toBe('text-success');
    });

    it('deve definir a classe como "text-warning" quando o status for "Apto com Limitações"', () => {
      component.status = 'Apto com Limitações';
      component.ngOnChanges();
      expect(component.statusClass).toBe('text-warning');
    });

    it('deve definir a classe como "text-danger" para qualquer outro status', () => {
      component.status = 'Inapto';
      component.ngOnChanges();
      expect(component.statusClass).toBe('text-danger');

      component.status = 'Desconhecido';
      component.ngOnChanges();
      expect(component.statusClass).toBe('text-danger');
    });
  });

  describe('@Input Properties', () => {
    it('deve aceitar um valor de "score" através do @Input', () => {
      component.score = 85;
      expect(component.score).toBe(85);
    });

    it('deve aceitar um valor de "status" através do @Input', () => {
      component.status = 'Apto';
      expect(component.status).toBe('Apto');
    });
  });

  describe('Default Values', () => {
    it('deve ter "score" inicial como 0', () => {
      expect(component.score).toBe(0);
    });

    it('deve ter "status" inicial como "Inapto"', () => {
      expect(component.status).toBe('Inapto');
    });

    it('deve ter "statusClass" inicial como "text-danger"', () => {
      expect(component.statusClass).toBe('text-danger');
    });
  });
});
