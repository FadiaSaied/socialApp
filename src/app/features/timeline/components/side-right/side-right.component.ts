import { SearchPipe } from './../../../../shared/pipes/search-pipe';
import { Component, inject, OnInit, signal } from '@angular/core';
import { FollowersService } from '../posts/services/followers.service';
import { Follower } from '../posts/models/follower.interface';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-side-right',
  imports: [SearchPipe, FormsModule],
  templateUrl: './side-right.component.html',
  styleUrl: './side-right.component.css',
})
export class SideRightComponent implements OnInit {
  allFollowers = signal<Follower[]>([]);
  text = signal('');
  private readonly followersService = inject(FollowersService);

  ngOnInit(): void {
    this.getFollersSuggestion();
  }
  getFollersSuggestion(): void {
    this.followersService.getFollowers().subscribe({
      next: (res) => {
        this.allFollowers.set(res.data.suggestions);
      },
    });
  }
}
