import { Component, ElementRef, EventEmitter, HostListener, Input, input, Output, signal } from '@angular/core';
import { DataSelect } from '../dtos/dtos';
type Elementos = string[] | Map<number, string>;
@Component({
  selector: 'app-select-base',
  standalone: true,
  imports: [],
  templateUrl: './select-base.component.html',
 
})
export class SelectBaseComponent {
  private _etiqueta: string = "";
  private _placeholder: string = "Seleccionar";
  
  protected _filtroInput : string = "";
  protected _isShow = signal(false);
  private _elementos!: Elementos;
  protected _selectItems : DataSelect[] = [];
  constructor(private elementRef: ElementRef) { }

  ngOnInit(){
    if(this.isArray(this.elementos)){
        this.elementos.forEach(element => {
          this._selectItems.push({
            check: false,
            value: element,
            key: 0
          });
        });
    }else{
      this.mapToArray(this.elementos).forEach(element => {
        this._selectItems.push({
          check: false,
          value: element.value,
          key: element.key

        });
      });
    }
  }

  generateSimpleId(): string {
    return 'id-' + Math.random().toString(36).slice(2, 11);
  }

  @HostListener('document:click', ['$event'])
  clickFuera(event: Event) {
    if (!this.elementRef.nativeElement.contains(event.target) && this._isShow()) {
      this._isShow.set(false);
    }
  }
  
  isArray(value: Elementos): value is string[] {
    return Array.isArray(value);
  }

  mapToArray(map: Elementos): { key: number, value: string }[] {
    if (map instanceof Map) {
      return Array.from(map.entries()).map(([key, value]) => ({ key, value }));
    }
    return [];
  }
  onInputFiltro(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this._filtroInput= inputElement.value;
    console.log('Valor del input:', this._filtroInput);
  }

  showElementos() {
    if (this._isShow()) {
      this._isShow.set(false);
    } else {
      this._isShow.set(true);
    }
  }

  @Input({ required: true })
  public get elementos(): Elementos {
    return this._elementos;
  }
  public set elementos(value: Elementos) {
    this._elementos = value;
  }
  @Input({})
  public get etiqueta(): string {
    return this._etiqueta;
  }
  public set etiqueta(value: string) {
    this._etiqueta = value;
  }
  @Input({})
  public get placeholder(): string {
    return this._placeholder;
  }
  public set placeholder(value: string) {
    this._placeholder = value;
  }
}
