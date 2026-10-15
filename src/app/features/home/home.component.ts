import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { BioService } from 'src/app/core/services/bio.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],

})
export class HomeComponent implements OnInit {

  bio$ = this.bioService.getBio();
  respOptions = [
    { viewClasses: 'd-none d-md-flex', headingClass: 'display-1', useSmallerHeadings: false },
    { viewClasses: 'd-flex d-md-none', headingClass: '', useSmallerHeadings: true }
  ];
  constructor(
    private bioService: BioService,
    private title: Title,
    private meta: Meta
  ){}

  ngOnInit(): void {
    this.title.setTitle('Jude Asiedu — Senior Full-Stack Developer | Portfolio');
    this.meta.updateTag({ name: 'description', content: 'Portfolio of Jude Asiedu (A.L.F.R.E.D), a Senior Full-Stack Developer based in Accra, Ghana. Skills, experience, projects, and contact.' });
  }

  openMail(){
    let url = "mailto:jude.asiedu99@gmail.com?Subject=Hello"
    window.open(url)
  }
}
