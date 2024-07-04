import { Injectable, Renderer2, signal } from "@angular/core";

@Injectable({
    providedIn: 'root',
  })

export class DarkModeService{
    constructor(){}   
    
  darkModeSignal = signal<string>('null');
  themeModeUpdate() {
    this.darkModeSignal.update((value) => (value === "dark"? "null":"dark"));
     // if set via local storage previously
     if (localStorage.getItem('color-theme')) {
      if (localStorage.getItem('color-theme') === 'light') {
          document.documentElement.classList.add('dark');
          localStorage.setItem('color-theme', 'dark');
      } else {
          document.documentElement.classList.remove('dark');
          localStorage.setItem('color-theme', 'light');
      }

  // if NOT set via local storage previously
  } else {
      if (document.documentElement.classList.contains('dark')) {
          document.documentElement.classList.remove('dark');
          localStorage.setItem('color-theme', 'light');
      } else {
          document.documentElement.classList.add('dark');
          localStorage.setItem('color-theme', 'dark');
      }
  }
    
  }
   

    
}