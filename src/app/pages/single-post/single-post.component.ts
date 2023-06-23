import { Observable, tap } from 'rxjs';
import { Post } from 'src/app/models/post';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.less'],
})
export class SinglePostComponent implements OnInit {
  post$!: Observable<Post>;
  similerPosts$!: Observable<{ id: string; data: Post }[]>;

  constructor(
    private route: ActivatedRoute,
    private postService: PostService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(({ id }) => {
      this.post$ = this.postService
        .loadOnePost(id)
        .pipe(tap((post) => this.loadSimilarPosts(post.category.categoryId)));
      this.postService.incrementViews(id);
    });
  }

  formatDate(date: any): string {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(new Date(date.seconds * 1000));
  }

  loadSimilarPosts(categoryId: string): void {
    this.similerPosts$ = this.postService.loadSimilarPosts(categoryId);
  }
}
