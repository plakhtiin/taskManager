import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TestJsonService } from '../../services/test-json.service';
import { Location } from '@angular/common';

import { Post } from '../../classes/post';
import { Comment } from '../../classes/comment';
import { FormGroup } from '@angular/forms';


@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  id: number;
  post: Post;
  comments: Comment[] = [];
  edit: boolean = false;
  title: string;

  constructor(
    private httpService: TestJsonService,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit() {
    this.id = +this.route.snapshot.paramMap.get('id');
    this.getPostById(this.id)
    this.getComments(this.id)
  }

  getPostById(id: number) {
    this.httpService.getPostById(id).subscribe(
      data => { 
        if(data) {
          this.post = data
        } 
      },
      err => { console.log('Error!') }
    )
  }
  getComments(id: number) {
    this.httpService.getPostComents(id).subscribe(
      data => {
        if(data.length) {
          this.comments = data
        }
      },
      err => { console.log('Error!') }
    )
  }

  updatePostField(){
    this.httpService.updatePostField(this.post.id, this.title)
    .subscribe(
      (data: Post) => { console.log(data) },
      err => { console.log(`Error: ${err}`) }
    )
    this.edit = false;
  }

  openEditField() {
    this.edit = true;
  }
  closeEditField() {
    this.edit = false;
  }

  public goBack(): void {
    this.location.back();
  }

}