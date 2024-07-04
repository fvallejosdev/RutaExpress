import { NgClass } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { DarkModeService } from '../../../features/ajustes/servicios/dark.mode';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [NgClass],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  //  @ViewChild('theme_toggle_dark_icon') _dark_icon!: ElementRef;
  //  @ViewChild('theme_toggle_light_icon') _light_icon!: ElementRef;
 darkModeService : DarkModeService = inject(DarkModeService);
  
  ngOnInit(): void {
   
  }
  // isDarkMode():boolean{
  //   return this.darkmode.isDarkMode();
  // }
  toggleBtnDarkMode() {
    this.darkModeService.themeModeUpdate();
    //this.darkmode.verificaDarkMode(this.renderer);
  }


}
