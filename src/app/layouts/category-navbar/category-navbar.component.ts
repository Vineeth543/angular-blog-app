import { Component } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-category-navbar',
  templateUrl: './category-navbar.component.html',
  styleUrls: ['./category-navbar.component.less'],
})
export class CategoryNavbarComponent {
  constructor(private categoryService: CategoryService) {}

  categories$ = this.categoryService.loadData();
}
