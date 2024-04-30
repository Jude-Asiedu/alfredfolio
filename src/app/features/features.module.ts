import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeaturesRoutingModule } from './features-routing.module';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ProjectsComponent } from './projects/projects.component';
import { BlogComponent } from './blog/blog.component';
import { SiteSettingsComponent } from './site-settings/site-settings.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    HomeComponent,
    AboutComponent,
    ProjectsComponent,
    BlogComponent,
    SiteSettingsComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
    FeaturesRoutingModule
  ]
})
export class FeaturesModule { }
