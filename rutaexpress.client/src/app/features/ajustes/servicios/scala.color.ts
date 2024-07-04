import { Injectable } from "@angular/core";
import chroma from "chroma-js";
import { ColorScale } from "../../../shared/interfaces/interfaces";
import { ClasificacionColor } from "../enums/enums";

@Injectable({
  providedIn: 'root',
})
export class ColorGeneratorService {
  isValidColor(color:string):boolean{
    return chroma.valid(color);
  }
  generatePaletteColores(baseColor: string): ColorScale[] {
    const colorInicialLigth = chroma(baseColor).luminance(0.947);//0.945
    const colorFinalDark = chroma(baseColor).luminance(0.02);//0.02
    const scale = chroma.scale([colorInicialLigth, baseColor,colorFinalDark]).colors(11);
    scale[5]=baseColor;
    const keys = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950'];
    return keys.map((key, index) => ({ key, value: scale[index] }));
  }

   clasificarColor(color:string):ClasificacionColor {
    const luminance = chroma(color).luminance();
    const contrasteConBlanco = chroma.contrast(color, 'white');
    const contrasteConNegro = chroma.contrast(color, 'black');

    if (contrasteConBlanco < 3) {
        return ClasificacionColor.luminoso;
    } else if (contrasteConNegro < 3) {
        return ClasificacionColor.oscuro;
    } else {
        return ClasificacionColor.intermedio;
    }
}
}
