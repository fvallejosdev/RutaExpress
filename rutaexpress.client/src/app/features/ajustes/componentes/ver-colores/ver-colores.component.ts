import { Component, EventEmitter, input, Input, Output, signal } from '@angular/core';
import { ColorScale } from '../../../../shared/interfaces/interfaces';
import { NgClass } from '@angular/common';
import { ToastComponent } from '../../../../shared/components/toast/toast.component';

@Component({
  selector: 'app-ver-colores',
  standalone: true,
  imports: [NgClass,ToastComponent],
  templateUrl: './ver-colores.component.html',
  styleUrl: './ver-colores.component.css'
})
export class VerColoresComponent {
 @Input({required: true}) colores!: ColorScale[];
 @Input({required: true}) titulo!:string;
 @Input() colorSelect!: string;
 @Output() colorSelectEmit = new EventEmitter<string>();
 showToast = signal(false);
protected colorCopy: string ="";

// onColorChangePrimary(event: string): void {
//   this.colorSelectEmit.emit(event)
// }
 mostrarToast() {
  this.showToast.set(true);
  setTimeout(() => {
    this.showToast.set(false);
  }, 5000); // 1000 milisegundos = 1 segundo
}

copiarAlPortapapeles(texto: string) {
  navigator.clipboard.writeText(texto).then(() => {
    this.colorCopy = texto;
    this.colorSelectEmit.emit(texto)
    this.mostrarToast();
  }).catch(err => {
  });
}

}
