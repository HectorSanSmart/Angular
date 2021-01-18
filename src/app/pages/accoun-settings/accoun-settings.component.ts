import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-accoun-settings',
  templateUrl: './accoun-settings.component.html',
  styles: [
  ]
})
export class AccounSettingsComponent implements OnInit {

  public linkTheme = document.querySelector('#theme');

  public tema: string = '';


  constructor() { }

  ngOnInit(): void {

  }

  //const url = localStorage.getItem('theme') || './assets/css/colors/purple-dark.css'


  changeTheme(theme: string) {
    const url = `./assets/css/colors/${theme}.css`;

    console.log('Heyyy', theme);

    this.linkTheme.setAttribute('href', url);
    localStorage.setItem('theme', url)
    this.tema = theme;

  }
}
