import { Component, OnInit } from '@angular/core';
import { Comment } from '../../classes/comment';
import { TestJsonService } from '../../services/test-json.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { MatTableDataSource } from '@angular/material';


@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {

  comments: any;
  postId: number;

  constructor(
    private httpService: TestJsonService,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit() {
    this.postId = +this.route.parent.snapshot.paramMap.get( "id" );
    this.getComments(this.postId);
  }

  getComments(postId: number) {
    this.httpService.getPostComents(postId).subscribe(
      (data: Comment[]) => {
        if(data.length){
          this.comments = new MatTableDataSource<Comment>(data);
        }
      },
      err => { console.log('Error!') }
    )
  }


}
