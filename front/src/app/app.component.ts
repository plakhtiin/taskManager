import { Component } from '@angular/core';
import { Task } from './classes/task';
import { TodoService } from './services/todo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  constructor(private todoService: TodoService) { }
}
