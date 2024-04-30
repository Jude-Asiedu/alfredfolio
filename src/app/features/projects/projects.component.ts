import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent  implements OnInit{

  images:any=[];
  constructor(){

  }

  ngOnInit(): void {

    this.images = [23, 39, 41].map((n) => `assets/img/${n}.JPEG`);

  }

  dreamer(){
    window.alert('Helow')
  }

}
