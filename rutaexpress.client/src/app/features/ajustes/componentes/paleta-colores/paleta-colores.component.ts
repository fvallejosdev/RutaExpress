import { Component, signal } from '@angular/core';
import { Theme, ThemeService } from '../../servicios/theme.service';
import { ColorGeneratorService } from '../../servicios/scala.color';
import { VerColoresComponent } from '../ver-colores/ver-colores.component';
import { InputColorComponent } from '../input-color/input-color.component';
import { ClasificacionColor, TipoPaletaColor } from '../../enums/enums';
import { ToastComponent } from '../../../../shared/components/toast/toast.component';
import { SelectComponent } from '../../../../shared/components/custome-select/select/select.component';
import { ColorCustomUi, ColorScale } from '../../../../shared/interfaces/interfaces';



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
    menuLateral: {fondo: "",fuente:"",hover:""},
    barraSuperior: {fondo: "",fuente:"",hover:""},
    footer: {fondo: "",fuente:"",hover:""},
  };
 
  //  colorSecondario = signal(false);
  //  colorAccent = signal(false);
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
  colorText = signal("");
  constructor(protected scalaColor: ColorGeneratorService, private themeService:ThemeService){
  }

  ngOnInit(): void {
    //this.colorBase = this.themeService.getColorBaseLocalStorage();
    this.themeService.getTheme().subscribe(theme => {
      this.colorPalette = theme;
      // if(this.colorPalette.paletteSecondary.length !== 0){
      //   this.colorSecondario.set(true);
      // }
      // if(this.colorPalette.accent.length !== 0){
      //   this.colorAccent.set(true);
      // }
    });
   
    
  }

  

  // agregarColorSecundario(){
  //   this.colorSecondario.set(true);
  // }

  // agregarColorAccent(){
  //   this.colorAccent.set(true);
  // }

  // removeColor(tipo:TipoPaletaColor){
  //   this.themeService.removeColor(tipo);
  //   this.colorSecondario.set(false);
  // }
   
 

  selectValueEmit(value:string){
    this.conponenteSignal.set(value);

    switch(value){
      case this.componentes[0]:
        this.colorComponente.set(this.colorPalette.barraSuperior.fondo);
        this.colorText.set(this.colorPalette.barraSuperior.fuente);
        break;
      case this.componentes[1]:
        this.colorComponente.set(this.colorPalette.menuLateral.fondo);
        this.colorText.set(this.colorPalette.menuLateral.fuente);
          break;
      case this.componentes[2]:
        this.colorComponente.set(this.colorPalette.footer.fondo);
        this.colorText.set(this.colorPalette.footer.fuente);
            break;
    }
   
  }
  //tipoColor = signal<number>(0); //borrar
  onChangeColorTextComponent(color:string){
    if(!this.scalaColor.isValidColor(color)){
      return;
    }
    switch(this.conponenteSignal()){
     case this.componentes[0]:
       this.colorPalette.barraSuperior.fuente = color;
       break;
     case this.componentes[1]:
       this.colorPalette.menuLateral.fuente = color;
         break;
     case this.componentes[2]:
       this.colorPalette.footer.fuente = color;
           break;
           default:
             break;
   }
   if(this.conponenteSignal() !== ""){
    this.colorText.set(color);
     this.themeService.setTheme(this.colorPalette);
   }
  }

  onChangeColorComponent(color:string){
    if(!this.scalaColor.isValidColor(color)){
      return;
    }
    this.colorComponente.set(color);
    let tipoClasi = this.scalaColor.clasificarColor(color);
    let fuenteColor =   this.colorFuenteTexto(tipoClasi);
    this.colorText.set(fuenteColor);
    let colorshover:ColorScale[] = this.scalaColor.generatePaletteColores(color);
    console.log("colo hover drawer "+colorshover[7].value)
     switch(this.conponenteSignal()){
      case this.componentes[0]:
        this.colorPalette.barraSuperior= {fondo: color,fuente:fuenteColor,hover:colorshover[6].value};
        break;
      case this.componentes[1]:
        this.colorPalette.menuLateral= {fondo: color,fuente:fuenteColor,hover:colorshover[6].value};
          break;
      case this.componentes[2]:
        this.colorPalette.footer= {fondo: color,fuente:fuenteColor,hover:colorshover[6].value};
            break;
            default:
              break;
    }
    if(this.conponenteSignal() !== ""){
      this.themeService.setTheme(this.colorPalette);
    }
   
  }
  colorFuenteTexto(tipoColor:ClasificacionColor):string{
    switch(tipoColor){
      case ClasificacionColor.luminoso:
        return this.colorPalette.palettePrimary[9].value;
        break;
        case ClasificacionColor.oscuro:
         return this.colorPalette.palettePrimary[0].value;
        break;
        case ClasificacionColor.intermedio:
          return this.colorPalette.palettePrimary[0].value;
        break;
    }
  }

  setfondoTextColor(colorText:string,colorFondo:string, colorHover:string):ColorCustomUi{
    let data: ColorCustomUi = {
      fondo: colorFondo,
      fuente: colorText,
      hover: colorHover
    }
    return data;
  }

  setColorInterfasUI(fuenteColor:string){
    this.colorPalette.palettePrimary = this.scalaColor.generatePaletteColores(this.colorPalette.primary);
    this.colorPalette.menuLateral = this.setfondoTextColor(fuenteColor,this.colorPalette.palettePrimary[5].value,this.colorPalette.palettePrimary[6].value);
    this.colorPalette.footer = this.setfondoTextColor(fuenteColor,this.colorPalette.palettePrimary[7].value,this.colorPalette.palettePrimary[8].value);
   
  }

  onColorChangePrimaryEmit(value:string){
    if(!this.scalaColor.isValidColor(value)){
      return;
    }
    //this.colorBase.colorPrimary = value;
    let tipoClasi = this.scalaColor.clasificarColor(value);
    let fuenteColor =   this.colorFuenteTexto(tipoClasi);
    this.colorPalette.primary= value;
    this.colorPalette.barraSuperior =  this.setfondoTextColor(fuenteColor,this.colorPalette.palettePrimary[7].value,this.colorPalette.palettePrimary[8].value);
    this.setColorInterfasUI(fuenteColor);
    
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
