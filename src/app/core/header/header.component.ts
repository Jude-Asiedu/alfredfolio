import { Component, HostListener, OnInit, ViewEncapsulation } from '@angular/core';
import { BioService } from 'src/app/core/services/bio.service';
import { HeaderService } from 'src/app/core/services/header.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent implements OnInit {

  bio$ = this.bioService.getBio();
  isHome$ = this.headerService.isHome();
  isScrolled = false;

  menuItems = [
    { title: 'About',    homePath: '/about',    fragment: '', pagePath: '/about',    icon: 'far fa-user' },
    { title: 'Projects', homePath: '/projects', fragment: '', pagePath: '/projects', icon: 'far fa-folder-open' },
    { title: 'Blog',     homePath: '/blog',     fragment: '', pagePath: '/blog',     icon: 'far fa-newspaper' }
  ];

  constructor(private bioService: BioService, private headerService: HeaderService){}

  ngOnInit(): void { }

  @HostListener('window:scroll')
  onScroll(): void {
    this.isScrolled = window.scrollY > 12;
  }

  openResume(){
    window.open("assets/pdf/pdresume.pdf", '_blank');
  }

  scrollToSection(sectionId: string): void {
    this.headerService.scrollToSection(sectionId);
  }
}
