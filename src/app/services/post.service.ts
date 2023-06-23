import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Post } from '../models/post';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase/compat/app';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private afs: AngularFirestore) {}

  loadFeaturedPosts() {
    return this.afs
      .collection('posts', (ref) =>
        ref.where('isFeatured', '==', true).limit(4)
      )
      .snapshotChanges()
      .pipe(
        map((actions) =>
          actions.map((a) => {
            const id = a.payload.doc.id;
            const data = a.payload.doc.data() as Post;
            return { id, data };
          })
        )
      );
  }

  loadLatestPosts() {
    return this.afs
      .collection('posts', (ref) => ref.orderBy('createdAt', 'desc'))
      .snapshotChanges()
      .pipe(
        map((actions) =>
          actions.map((a) => {
            const id = a.payload.doc.id;
            const data = a.payload.doc.data() as Post;
            return { id, data };
          })
        )
      );
  }

  loadCategoryPosts(categoryId: string) {
    return this.afs
      .collection('posts', (ref) =>
        ref.where('category.categoryId', '==', categoryId).limit(4)
      )
      .snapshotChanges()
      .pipe(
        map((actions) =>
          actions.map((a) => {
            const id = a.payload.doc.id;
            const data = a.payload.doc.data() as Post;
            return { id, data };
          })
        )
      );
  }

  loadOnePost(postId: string): Observable<Post> {
    return this.afs
      .doc<Post>(`posts/${postId}`)
      .valueChanges()
      .pipe(map((post) => post as Post));
  }

  loadSimilarPosts(
    categoryId: string
  ): Observable<{ id: string; data: Post }[]> {
    return this.afs
      .collection('posts', (ref) =>
        ref.where('category.categoryId', '==', categoryId).limit(4)
      )
      .snapshotChanges()
      .pipe(
        map((actions) =>
          actions.map((a) => {
            const id = a.payload.doc.id;
            const data = a.payload.doc.data() as Post;
            return { id, data };
          })
        )
      );
  }

  incrementViews(postId: string): void {
    const viewsCount = {
      views: firebase.default.firestore.FieldValue.increment(1),
    };

    this.afs
      .doc(`posts/${postId}`)
      .update(viewsCount)
      .then(() => console.log('Views Updated..!'))
      .catch((error) => console.log(error));
  }
}
