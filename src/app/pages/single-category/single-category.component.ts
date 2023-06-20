import { Observable } from 'rxjs';
import { Post } from 'src/app/models/post';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-single-category',
  templateUrl: './single-category.component.html',
  styleUrls: ['./single-category.component.less'],
})
export class SingleCategoryComponent implements OnInit {
  categoryName!: string;
  posts$!: Observable<{ id: string; data: Post }[]>;

  constructor(
    private route: ActivatedRoute,
    private postService: PostService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(({ category, id }) => {
      id && (this.posts$ = this.postService.loadCategoryPosts(id));
      this.categoryName = category;
    });
  }
}
