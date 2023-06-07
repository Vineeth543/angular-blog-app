import { Component } from '@angular/core';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less'],
})
export class HomeComponent {
  constructor(private postService: PostService) {}

  featuredPosts$ = this.postService.loadFeaturedPosts();

  latestPosts$ = this.postService.loadLatestPosts();
}
