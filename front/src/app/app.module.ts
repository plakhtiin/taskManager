import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { 
  MatCardModule, 
  MatToolbarModule, 
  MatButtonModule,
  MatIconModule,
  MatTableModule,
  MatSortModule,
  MatInputModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatSelectModule,
  MatSlideToggleModule,
  MatCheckboxModule,
  MatListModule,
  MatMenuModule
} from '@angular/material';
import { MatDialogModule } from '@angular/material/dialog';

import { AppComponent } from './app.component';
import { CreateTaskComponent } from './components/create-task/create-task.component';
import { TodoService } from './services/todo.service';
import { TestJsonService } from './services/test-json.service';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { EditTaskComponent } from './components/edit-task/edit-task.component';
import { FilterPipe } from './pipes/filter.pipe';
import { PostsComponent } from './components/posts/posts.component';
import { PostComponent } from './components/post/post.component';
import { CommentsComponent } from './components/comments/comments.component';
import { AddPostComponent } from './components/add-post/add-post.component';
import { EditPostComponent } from './components/edit-post/edit-post.component';
import { AnimateImagesComponent } from './components/animate-images/animate-images.component';
import { GmapsComponent } from './components/gmaps/gmaps.component';
import { AgmCoreModule, GoogleMapsAPIWrapper, PolygonManager } from '@agm/core';
import { AgmSnazzyInfoWindowModule } from '@agm/snazzy-info-window';
import { AgmJsMarkerClustererModule } from '@agm/js-marker-clusterer';
import { AppLoginComponent } from './components/app-login/app-login.component';

@NgModule({
  declarations: [
    AppComponent,
    CreateTaskComponent,
    TodoListComponent,
    EditTaskComponent,
    FilterPipe,
    PostsComponent,
    PostComponent,
    CommentsComponent,
    AddPostComponent,
    EditPostComponent,
    AnimateImagesComponent,
    GmapsComponent,
    AppLoginComponent,
  ],
  imports: [
    NoopAnimationsModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpModule,
    MatCardModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatSortModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatCheckboxModule,
    MatDialogModule,
    BrowserAnimationsModule,
    MatListModule,
    MatMenuModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyARQrBSaI0pAjqKxOB0s1OT7Y6klrQMywE',
      libraries: ["places"]
    }),
    AgmSnazzyInfoWindowModule,
    AgmJsMarkerClustererModule
  ],
  exports: [
    MatCardModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatSortModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatCheckboxModule,
    MatDialogModule    
  ],
  providers: [
    TodoService,
    TestJsonService,
    PolygonManager,
    GoogleMapsAPIWrapper
  ],
  bootstrap: [AppComponent],
  entryComponents: [ 
    AddPostComponent,
    EditPostComponent,
    CreateTaskComponent,
    EditTaskComponent
  ]
})
export class AppModule { }
