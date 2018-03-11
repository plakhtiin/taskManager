import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule, NoopAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppRoutingModule} from './app-routing.module';
import {HttpClientModule} from '@angular/common/http';
import {HttpModule} from '@angular/http';
import {
	MatButtonModule,
	MatCardModule,
	MatCheckboxModule,
	MatDatepickerModule,
	MATERIAL_SANITY_CHECKS,
	MatIconModule,
	MatInputModule,
	MatListModule,
	MatMenuModule,
	MatNativeDateModule,
	MatSelectModule,
	MatSlideToggleModule, MatSnackBarModule,
	MatSortModule,
	MatTableModule,
	MatTabsModule,
	MatToolbarModule
} from '@angular/material';
import {MatDialogModule} from '@angular/material/dialog';

import {AppComponent} from './app.component';
import {FilterPipe} from './pipes/filter.pipe';
import {CreateTaskComponent} from './components/create-task/create-task.component';
import {TodoService} from './services/todo.service';
import {TodoListComponent} from './components/todo-list/todo-list.component';
import {EditTaskComponent} from './components/edit-task/edit-task.component';
import {AppLoginComponent} from './components/app-login/app-login.component';
import {SignUpComponent} from './components/app-login/sign-up/sign-up.component';
import {SignInComponent} from './components/app-login/sign-in/sign-in.component';
import {AuthService} from './services/auth.service';
import {LoginGuardService} from './services/loginGuard.service';
import {ServerService} from './services/server.service';

@NgModule({
	declarations: [
		AppComponent,
		CreateTaskComponent,
		TodoListComponent,
		EditTaskComponent,
		FilterPipe,
		AppLoginComponent,
		SignUpComponent,
		SignInComponent
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
		MatTabsModule,
		MatSnackBarModule
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
		MatDialogModule,
		MatTabsModule,
		MatSnackBarModule
	],
	providers: [
		TodoService,
		{
			provide: MATERIAL_SANITY_CHECKS,
			useValue: false
		},
		AuthService,
		LoginGuardService,
		ServerService
	],
	bootstrap: [AppComponent],
	entryComponents: [
		CreateTaskComponent,
		EditTaskComponent,
		SignUpComponent,
		SignInComponent
	]
})
export class AppModule {
}
