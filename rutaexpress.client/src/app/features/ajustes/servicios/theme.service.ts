// theme.service.ts
import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';
import { ColorCustome, ColorScale, ColorCustomUi } from '../../../shared/interfaces/interfaces';
import { TipoPaletaColor } from '../enums/enums';

export interface Theme {
  palettePrimary: ColorScale[];
  paletteSecondary: ColorScale[];
  accent: ColorScale[];
  fondo: string;
  primary: string;
  secundary: string;
  barraSuperior: ColorCustomUi;
  menuLateral: ColorCustomUi;
  footer: ColorCustomUi;
}

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private themeSubject = new BehaviorSubject<Theme>(this.getStoredTheme());

  constructor() { }

    getStoredTheme(): Theme {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
      return JSON.parse(storedTheme);
    }
    return this.getDefaultTheme();
  }

   setTheme(theme: Theme) {
    localStorage.setItem('theme', JSON.stringify(theme));
    this.themeSubject.next(theme);
    this.applyTheme(theme);
  }

  removeColor(tipo:TipoPaletaColor){
    let storedTheme = this.getStoredTheme();
    switch(tipo){
      case TipoPaletaColor.primary:
        storedTheme.palettePrimary = [];
        break;
      case TipoPaletaColor.secondary:
        storedTheme.paletteSecondary = [];
        break;
      case TipoPaletaColor.accent:
        storedTheme.accent = [];
    }
    this.setTheme(storedTheme);
  }

  // setColorBaseLocalStorage(colorBase : ColorCustome){
  //   localStorage.setItem('colorBase', JSON.stringify(colorBase));
  // }
  // getColorBaseLocalStorage():ColorCustome{
  //   const storedColorBase = localStorage.getItem('colorBase');
  //   if(storedColorBase){
  //     return JSON.parse(storedColorBase);
  //   }else{
  //    let colorBase : ColorCustome = {
  //       colorPrimary:  '#22c55e',
  //       colorSecondary: '#22c55e', 
  //       colorAccent: '#ffffff'
  //     }
  //     return colorBase;
  //   }
  // }

  getTheme() {
    return this.themeSubject.asObservable();
  }

  applyTheme(theme: Theme) {
    document.documentElement.style.setProperty(`--color-fondo`, theme.fondo);
    document.documentElement.style.setProperty(`--color-primario`, theme.primary);
    document.documentElement.style.setProperty(`--color-secundario`, theme.secundary);
    //colors ui custom
    document.documentElement.style.setProperty(`--color-barrasup`, theme.barraSuperior.fondo);
    document.documentElement.style.setProperty(`--color-barrasup-text`, theme.barraSuperior.fuente);
    document.documentElement.style.setProperty(`--color-barrasup-hover`, theme.barraSuperior.hover);
    document.documentElement.style.setProperty(`--color-drawer`, theme.menuLateral.fondo);
    document.documentElement.style.setProperty(`--color-drawer-text`, theme.menuLateral.fuente);
    document.documentElement.style.setProperty(`--color-drawer-hover`, theme.menuLateral.hover);
    document.documentElement.style.setProperty(`--color-footer`, theme.footer.fondo);
    document.documentElement.style.setProperty(`--color-footer-text`, theme.footer.fuente);
    document.documentElement.style.setProperty(`--color-footer-hover`, theme.footer.hover);

    theme.palettePrimary.forEach(item => {
      document.documentElement.style.setProperty(`--color-primary-${item.key}`, item.value);
    });
    theme.paletteSecondary.forEach(item => {
      document.documentElement.style.setProperty(`--color-secondary-${item.key}`, item.value);
    });
    
    theme.accent.forEach(item => {
      document.documentElement.style.setProperty(`--color-accent-${item.key}`, item.value);
    });
  }

  private getDefaultTheme(): Theme {
    return {
      palettePrimary: [
      {
        key: "50",
        value: "#eff5ff"
      },
      {
        key:"100",
        value: "#dbe8fe"
      },
      {
        key:"200",
        value: "#bfd7fe"
      },
      {
        key:"300",
        value: "#93bbfd"
      },
      {
        key:"400",
        value: "#609afa"
      },
      {
        key:"500",
        value: "#3b82f6"
      },
      {
        key:"600",
        value: "#2570eb"
      },
      {
        key:"700",
        value: "#1d64d8"
      },
      {
        key:"800",
        value: "#1e55af"
      },
      {
        key:"900",
        value: "#1e478a"
      },
      {
        key:"950",
        value: "#172e54"
      }
    ],
      paletteSecondary: [
        {
          key: "50",
          value: "#effef9"
        },
        {
          key:"100",
          value: "#cafdee"
        },
        {
          key:"200",
          value: "#95fade"
        },
        {
          key:"300",
          value: "#58f0cb"
        },
        {
          key:"400",
          value: "#26dbb5"
        },
        {
          key:"500",
          value: "#0dbf9d"
        },
        {
          key:"600",
          value: "#07987f"
        },
        {
          key:"700",
          value: "#0a7b69"
        },
        {
          key:"800",
          value: "#0e6155"
        },
        {
          key:"900",
          value: "#105147"
        },
        {
          key:"950",
          value: "#02312c"
        }
      ],
      accent: [],
      fondo: "#ffffff",
      primary: "#22c55e",
      secundary: "#22c55e",
      barraSuperior: {fondo: "",fuente:"#ffffff",hover:""},
      menuLateral : {fondo: "",fuente:"#ffffff",hover:""},
      footer: {fondo: "",fuente:"#ffffff",hover:""}
    };
  }


  
}
