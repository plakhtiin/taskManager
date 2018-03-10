import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TodoListComponent} from './components/todo-list/todo-list.component';
import {PostsComponent} from './components/posts/posts.component';
import {PostComponent} from './components/post/post.component';
import {CommentsComponent} from './components/comments/comments.component';
import {AnimateImagesComponent} from './components/animate-images/animate-images.component';
import {GmapsComponent} from './components/gmaps/gmaps.component';

const routes: Routes = [
	{
		path: '',
		redirectTo: 'todos',
		pathMatch: 'full'
	},
	{
		path: 'todos',
		component: TodoListComponent
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
	declarations: []
})
export class AppRoutingModule {
}
