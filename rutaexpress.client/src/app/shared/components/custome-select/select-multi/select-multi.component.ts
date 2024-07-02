import { Component, ElementRef, EventEmitter, Input, Output } from '@angular/core';
import { SelectBaseComponent } from '../select-base/select-base.component';
import { NgFor } from '@angular/common';
import { DataSelect } from '../dtos/dtos';
type Elementos = string[] | Map<number, string>;

@Component({
  selector: 'app-select-multi',
  standalone: true,
  imports: [NgFor],
  templateUrl: './select-multi.component.html',
  styleUrl: './select-multi.component.css'
})
export class SelectMultiComponent extends SelectBaseComponent{
  
  @Output() valueSelect = new EventEmitter<DataSelect[]>();
  constructor(elementRef: ElementRef){
    super(elementRef);
    
  }

  get elemetosFiltro(){
    return this._selectItems.filter(item => item.value.toLocaleLowerCase().includes(this._filtroInput.toLocaleLowerCase()));
  }

  seleccionar(item: DataSelect) {
    item.check=  true;
    //this._isShow.set(false);
    this.valueSelect.emit(this._selectItems);
  }

  onCheckboxChange(event: Event, item: DataSelect): void {
    const inputElement = event.target as HTMLInputElement;
    item.check = inputElement.checked;
    this.valueSelect.emit(this._selectItems);
  }

}
