import { Component } from '@angular/core';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.less'],
})
export class PostCardComponent {
  images = [
    'https://images.freeimages.com/images/large-previews/ac9/railway-hdr-1361893.jpg',
    'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d',
    'https://images.freeimages.com/images/large-previews/e5c/mill-house-1637156.jpg',
    'https://images.freeimages.com/images/large-previews/810/highlander-1325292.jpg',
  ];

  randomImage() {
    return this.images[Math.floor(Math.random() * this.images.length)];
  }
}
