import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, mergeAll, filter, toArray } from 'rxjs';


export interface Project {
  name: string;
  stack: { iconClasses: string, name: string };
  description: string;
  sourceUrl: string;
  previewUrl: string;
  featured?: boolean;
}
@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  constructor(private http:HttpClient) { }

  getProjects(featured?: boolean): Observable<Project[]> {
    let projects$ = this.http.get<Project[]>('assets/json/projects.json');

    if (featured) {
      return projects$.pipe(
        mergeAll(),
        filter(project => project.featured || false),
        toArray()
      );
    }

    return projects$;
  }
}
