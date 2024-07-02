import { Component, ElementRef, EventEmitter, Output, ViewEncapsulation } from '@angular/core';
import { SelectBaseComponent } from '../select-base/select-base.component';
import { DataSelect } from '../dtos/dtos';

@Component({
  selector: 'app-select',
  standalone: true,
  imports: [],
  templateUrl: './select.component.html',
  styleUrl: './select.component.css',
  encapsulation: ViewEncapsulation.Emulated
})
export class SelectComponent extends SelectBaseComponent {
  @Output() valueSelect = new EventEmitter<DataSelect>();
  protected _itemSelect: DataSelect = {
    check: false,
    value: "",
    key: 0
  };
  constructor(elementRef: ElementRef){
    super(elementRef);
  }

  get elemetosFiltro(){
    return this._selectItems.filter(item => item.value.toLocaleLowerCase().includes(this._filtroInput.toLocaleLowerCase()));
  }

  
  // onInput(event: Event): void {
  //   const inputElement = event.target as HTMLInputElement;
  //   if(this._selectItems.find(e=> e.value !== inputElement.value)){
      
  //   }
  //   //this.userInput = inputElement.value;
  //   // console.log('El usuario escribió:', this.userInput);
  // }

  
  seleccionar(item: DataSelect) {
    this._itemSelect = item;
    this._isShow.set(false);
    this.valueSelect.emit(this._itemSelect);
  }

}
