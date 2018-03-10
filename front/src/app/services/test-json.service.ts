import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from '../classes/post';
import { Comment } from '../classes/comment';

@Injectable()
export class TestJsonService {

  root = 'https://jsonplaceholder.typicode.com';
  constructor(private http: HttpClient) {}

  getPosts() {
    return this.http.get<Post[]>(`${this.root}/posts`);
  }
  getPostById(id: number) {
    return this.http.get<Post>(`${this.root}/posts/${id}`);
  }
  getPostComents(id: number) {
    return this.http.get<Comment[]>(`${this.root}/posts/${id}/comments` || `${this.root}/comments?postId=${id}`);
  }
  getPostsByUserId(userId: number) {
    return this.http.get<Post[]>(`${this.root}/posts?userId=${userId}`);
  }
  postNewPost(post: Post) {
    return this.http.post(`${this.root}/posts`, post);
  }
  updatePost(post: Post) {
    return this.http.put(`${this.root}/posts/${post.id}`, post);
  }
  updatePostField(postId: number, title: string) {
    let body = {
      'title': title
    }
    return this.http.patch(`${this.root}/posts/${postId}`, body)
  }
  deletePost(postId: number) {
    return this.http.delete<Post>(`${this.root}/posts/${postId}`);
  }
}
