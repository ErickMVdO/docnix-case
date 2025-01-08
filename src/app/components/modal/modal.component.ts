import { Component, Input, OnChanges } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent implements OnChanges {

  @Input() score: number = 0;
  @Input() status: string = 'Inapto';

  statusClass: string = 'text-danger';

  constructor() { }

  ngOnChanges(): void {
    if(this.status === 'Apto') {
      this.statusClass = 'text-success';
    }
    else if(this.status === 'Apto com Limitações') {
      this.statusClass = 'text-warning';
    }
    else {
      this.statusClass = 'text-danger';
    }
  }

}
