import { Component } from '@angular/core';
import { SideLeftComponent } from './components/side-left/side-left.component';
import { PostsComponent } from './components/posts/posts.component';
import { SideRightComponent } from './components/side-right/side-right.component';

@Component({
  selector: 'app-timeline',
  imports: [SideLeftComponent, PostsComponent, SideRightComponent],
  templateUrl: './timeline.component.html',
  styleUrl: './timeline.component.css',
})
export class TimelineComponent {}
