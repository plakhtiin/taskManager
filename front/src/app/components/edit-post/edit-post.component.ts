import { Component, OnInit, Input, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Post } from '../../classes/post';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.scss']
})
export class EditPostComponent implements OnInit {

  formEdit: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<EditPostComponent>,
    private builder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) private data
  ) { }

  ngOnInit() {
    this.formEdit = this.builder.group({
      title: this.data.title,
      body: this.data.body,
      userId: this.data.userId
    })
  }

  onSubmit(form) {
    this.dialogRef.close(new Post(form.value, this.data.id))
  }

}
