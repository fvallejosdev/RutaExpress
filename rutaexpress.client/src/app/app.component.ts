import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { initFlowbite } from 'flowbite';
import { ThemeService } from './features/ajustes/servicios/theme.service';
import { DarkModeService } from './features/ajustes/servicios/dark.mode';
import { NgClass } from '@angular/common';
import { PaletaColoresComponent } from './features/ajustes/componentes/paleta-colores/paleta-colores.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, PaletaColoresComponent, NgClass],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  constructor(private themeService: ThemeService, protected darkMode: DarkModeService) { }


  ngOnInit(): void {
    initFlowbite();
    this.modoDark();
    this.themeService.applyTheme(this.themeService.getStoredTheme());

  }

  modoDark(){
    if (localStorage.getItem('color-theme') === 'dark' || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
      this.darkMode.darkModeSignal.update((value)=> value="dark");
    } else {
      this.darkMode.darkModeSignal.update((value)=> value="null");
      document.documentElement.classList.remove('dark');
    }
  }


  title = 'RutaExpress';
}
