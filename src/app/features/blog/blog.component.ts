import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent  implements OnInit{

  blogPost:any[]=[]

  constructor(private title: Title, private meta: Meta){}

  ngOnInit(): void {
    this.title.setTitle('Blog — Jude Asiedu');
    this.meta.updateTag({ name: 'description', content: 'Writing and notes by Jude Asiedu on web development, Angular, and the craft of building for the web.' });
  }

}
