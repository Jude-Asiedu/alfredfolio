import { Component, OnInit } from '@angular/core';
import { BioService } from 'src/app/core/services/bio.service';
import { HeaderService } from 'src/app/core/services/header.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  bio$ = this.bioService.getBio();
  isHome$ = this.headerService.isHome();

  menuItems = [
    { title: 'About Me', homePath: '/', fragment: 'about', pagePath: '/about' },
    { title: 'My Projects', homePath: '/', fragment: 'projects', pagePath: '/projects' },
    { title: 'My Blog', homePath: '/blog', fragment: '', pagePath: '/blog' }
  ];

  constructor(private bioService: BioService, private headerService: HeaderService){}

  ngOnInit(): void {}

  
}
