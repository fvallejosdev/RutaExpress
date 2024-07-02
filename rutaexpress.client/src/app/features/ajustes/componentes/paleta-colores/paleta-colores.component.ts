import { Component, signal } from '@angular/core';
import { ColorCustome } from '../../../../shared/interfaces/interfaces';
import { Theme, ThemeService } from '../../../../core/services/personalizacion-service/theme.service';
import { ColorGeneratorService } from '../../../../core/services/personalizacion-service/scala.color';
import { VerColoresComponent } from '../ver-colores/ver-colores.component';
import { InputColorComponent } from '../input-color/input-color.component';
import { TipoPaletaColor } from '../../enums/enums';
import { ToastComponent } from '../../../../shared/components/toast/toast.component';
import { SelectComponent } from '../../../../shared/components/custome-select/select/select.component';



@Component({
  selector: 'app-paleta-colores',
  standalone: true,
  imports: [VerColoresComponent,InputColorComponent,ToastComponent,SelectComponent],
  templateUrl: './paleta-colores.component.html',
  styleUrl: './paleta-colores.component.css'
})
export class PaletaColoresComponent {
  
  colorPalette:Theme = {
    palettePrimary : [],
    paletteSecondary: [],
    accent: [],
    fondo: "#ffffff",
    primary: "",
    secundary: "",
    menuLateral: "",
    barraSuperior: "",
    footer: ""
  };
 
   colorSecondario = signal(false);
   colorAccent = signal(false);
  tipoPrimario: TipoPaletaColor = TipoPaletaColor.primary;
  tipoSecundario: TipoPaletaColor = TipoPaletaColor.secondary;
  tipoAccent: TipoPaletaColor = TipoPaletaColor.accent;
 
  //colorAccent = signal(false);
  componentes:string[] = [
    "Barra superior",
    "Menu lateral",
    "Footer"
  ]
  conponenteSignal = signal<string>("");
  colorComponente = signal("");
  constructor(private scalaColor: ColorGeneratorService, private themeService:ThemeService){
  }

  ngOnInit(): void {
    //this.colorBase = this.themeService.getColorBaseLocalStorage();
    this.themeService.getTheme().subscribe(theme => {
      this.colorPalette = theme;
      if(this.colorPalette.paletteSecondary.length !== 0){
        this.colorSecondario.set(true);
      }
      if(this.colorPalette.accent.length !== 0){
        this.colorAccent.set(true);
      }
    });
   
    
  }

  

  agregarColorSecundario(){
    this.colorSecondario.set(true);
  }

  agregarColorAccent(){
    this.colorAccent.set(true);
  }

  removeColor(tipo:TipoPaletaColor){
    this.themeService.removeColor(tipo);
    this.colorSecondario.set(false);
  }

  selectValueEmit(value:string){
    this.conponenteSignal.set(value);
    // switch(this.conponenteSignal()){
    //   case this.componentes[0]:
    //     if(this.scalaColor.isValidColor(this.colorPalette.barraSuperior)){
    //       this.colorComponente.set(this.colorPalette.barraSuperior)
    //     }
      
    //     break;
    //   case this.componentes[1]:
    //     if(this.scalaColor.isValidColor(this.colorPalette.menuLateral)){
    //       this.colorComponente.set(this.colorPalette.menuLateral)
    //     }
    //       break;
    //   case this.componentes[2]:
    //     if(this.scalaColor.isValidColor(this.colorPalette.footer)){
    //       this.colorComponente.set(this.colorPalette.footer)
    //     }
    //         break;
    //         default:
    //           break;
    // }
   
  }

  onChangeColorComponent(color:string){
    if(!this.scalaColor.isValidColor(color)){
      return;
    }
    this.colorComponente.set(color);
     switch(this.conponenteSignal()){
      case this.componentes[0]:
        this.colorPalette.barraSuperior= color;
        break;
      case this.componentes[1]:
        this.colorPalette.menuLateral= color;
          break;
      case this.componentes[2]:
        this.colorPalette.footer= color;
            break;
            default:
              break;
    }
    if(this.conponenteSignal() !== ""){
      this.themeService.setTheme(this.colorPalette);
    }
   
  }
  
  onColorChangePrimaryEmit(value:string){
    if(!this.scalaColor.isValidColor(value)){
      return;
    }
    //this.colorBase.colorPrimary = value;
    this.colorPalette.primary= value;
    this.colorPalette.palettePrimary = this.scalaColor.generatePaletteColores(this.colorPalette.primary);
    this.themeService.setTheme(this.colorPalette);
    //this.themeService.setColorBaseLocalStorage(this.colorBase);
  }

  onColorChangeSecondaryEmit(value:string): void {
    if(!this.scalaColor.isValidColor(value)){
      return;
    }
    //this.colorBase.colorSecondary = value;
    this.colorPalette.secundary= value;
    this.colorPalette.paletteSecondary = this.scalaColor.generatePaletteColores( this.colorPalette.secundary);
    this.themeService.setTheme(this.colorPalette);
    //this.themeService.setColorBaseLocalStorage(this.colorBase);
  }

  onColorChangeAccentEmit(value:string): void {
    if(!this.scalaColor.isValidColor(value)){
      return;
    }
    //this.colorBase.colorAccent= value;
    this.colorPalette.fondo = value;
    //this.colorPalette.accent = this.scalaColor.generatePaletteColores(this.colorBase.colorAccent);
    this.themeService.setTheme(this.colorPalette);
    //this.themeService.setColorBaseLocalStorage(this.colorBase);
  }

  // onColorChangePrimary(event: any): void {
  //   if(!this.scalaColor.isValidColor(event.target.value)){
  //     return;
  //   }
    
  //   this.colorBase.colorPrimary = event.target.value;
  //   this.colorPalette.primary = this.scalaColor.generatePaletteColores(this.colorBase.colorPrimary);
  //   this.themeService.setTheme(this.colorPalette);
  //   this.themeService.setColorBaseLocalStorage(this.colorBase);
  // }

  // onColorChangeSecondary(event: any): void {
  //   if(!this.scalaColor.isValidColor(event.target.value)){
  //     return;
  //   }
  //   this.colorBase.colorSecondary = event.target.value;
  //   this.colorPalette.secondary = this.scalaColor.generatePaletteColores(this.colorBase.colorSecondary);
  //   this.themeService.setTheme(this.colorPalette);
  //   this.themeService.setColorBaseLocalStorage(this.colorBase);
  // }

  // onColorChangeAccent(event: any): void {
  //   if(!this.scalaColor.isValidColor(event.target.value)){
  //     return;
  //   }
  //   this.colorBase.colorAccent= event.target.value;
  //   this.colorPalette.accent = this.scalaColor.generatePaletteColores(this.colorBase.colorAccent);
  //   this.themeService.setTheme(this.colorPalette);
  //   this.themeService.setColorBaseLocalStorage(this.colorBase);
  // }

  
}
