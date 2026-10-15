import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { Project, ProjectsService } from 'src/app/core/services/projects.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  @Input() variant: 'grid' | 'carousel' = 'grid';

  projects$!: Observable<Project[]>;

  constructor(
    private projectsService: ProjectsService,
    private router: Router,
    private title: Title,
    private meta: Meta
  ) {}

  ngOnInit(): void {
    this.projects$ = this.projectsService.getProjects();

    if (this.router.url.startsWith('/projects')) {
      this.title.setTitle('Projects — Jude Asiedu');
      this.meta.updateTag({ name: 'description', content: 'Selected projects by Jude Asiedu — web and mobile applications built with Angular, React, Next.js, Ionic, and more.' });
    }
  }

  screenshotUrl(url: string): string {
    return `https://s.wordpress.com/mshots/v1/${encodeURIComponent(url)}?w=900&h=560`;
  }

  onPreviewError(event: Event, project: Project): void {
    const img = event.target as HTMLImageElement;
    if (img.src !== project.imageUrl) {
      img.src = project.imageUrl;
    }
  }
}
