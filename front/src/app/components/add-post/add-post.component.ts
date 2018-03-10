import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Post } from '../../classes/post';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss']
})
export class AddPostComponent implements OnInit {

  formAdd: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<AddPostComponent>,
    private builder: FormBuilder
  ) { }

  ngOnInit() {
    this.formAdd = this.builder.group({
      title: '',
      body: '',
      userId: ''
    })
  }

  onSubmit(form) {
    this.dialogRef.close(new Post(form.value))
  }

}
