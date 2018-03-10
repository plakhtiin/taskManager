import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TodoListComponent} from './components/todo-list/todo-list.component';

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
