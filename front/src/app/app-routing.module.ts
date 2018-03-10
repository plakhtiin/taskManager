import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TodoListComponent} from './components/todo-list/todo-list.component';
import {LoginGuardService} from './services/loginGuard.service';

const routes: Routes = [
	{
		path: '',
		redirectTo: 'login',
		pathMatch: 'full'
	},
	{
		path: 'todos',
		component: TodoListComponent,
		canActivate: [LoginGuardService]
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
	declarations: []
})
export class AppRoutingModule {
}
