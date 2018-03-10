import { Component, OnInit } from '@angular/core';
import { TestJsonService } from '../../services/test-json.service';
import { Post } from '../../classes/post';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AddPostComponent } from '../add-post/add-post.component';
import { filter } from 'rxjs/operators';
import { EditPostComponent } from '../edit-post/edit-post.component';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {

  addPostDialogRef: MatDialogRef<AddPostComponent>;
  editPostDialogRef: MatDialogRef<EditPostComponent>;
  posts: Post[] = [];

  constructor(
    private httpService: TestJsonService,
    public addDialog: MatDialog,
    public editDialog: MatDialog
  ) { }

  ngOnInit() {
    this.getPosts();
  }

  getPosts() {
    this.httpService.getPosts().subscribe(
      (data: Post[]) => { 
        if(data.length) {
          this.posts = data;
        }
      },
      err => { console.log(`Error: ${err}`) }
    )
  }

  openAddPostDialog(): void {
    this.addPostDialogRef = this.addDialog.open(AddPostComponent, {
      width: '400px',
    })

    this.addPostDialogRef.afterClosed()
    .pipe(filter(values => values))
    .subscribe(values => {
      this.httpService.postNewPost(values)
      .subscribe(
        (data: Post) => { console.log(`Added post with id: ${data.id}`) },
        err => { console.log(`Error: ${err}`) }
      );
    })
  }
  openEditPostDialog(post): void {
    this.editPostDialogRef = this.editDialog.open(EditPostComponent, {
      width: '400px',
      data: {
        id: post ? post.id : '',
        title: post ? post.title : '',
        body: post ? post.body : '',
        userId: post ? post.userId : ''
      }
    })

    this.editPostDialogRef.afterClosed()
    .pipe(filter(values => values))
    .subscribe(values => {
      this.httpService.updatePost(values)
      .subscribe(
        (data: Post) => { console.log(`Post with id: ${data.id} is updated`) },
        err => { console.log(`Error: ${err}`) }
      );
    })
  }

  deletePost(post: Post) {
    let id = post.id;
    this.httpService.deletePost(id)
    .subscribe(
      (data: Post) => { console.log(`Deleted post with id: ${id}`) },
      err => { console.log(`Error: ${err}`) }
    )
  }

}
