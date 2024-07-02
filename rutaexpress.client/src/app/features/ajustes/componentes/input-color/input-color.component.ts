import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-input-color',
  standalone: true,
  imports: [],
  templateUrl: './input-color.component.html',
  styleUrl: './input-color.component.css'
})
export class InputColorComponent {
  @Output() colorSelect = new EventEmitter<string>();
  @Input({required: true}) color! : string;
  @Input({required: true}) titulo! : string;
  

  onColorChangePrimary(event: any): void {
    this.colorSelect.emit(event.target.value)
    //this.colorBase.colorPrimary = event.target.value;
  }
}
