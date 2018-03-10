import { Pipe, PipeTransform } from '@angular/core';
import { Task } from '../classes/task';
import { Priority } from '../classes/priority';

@Pipe({
    name: 'filter'
})
export class FilterPipe implements PipeTransform {

    transform(tasks: Array<Task>, fs: any): Array<Task> {
        if (tasks && tasks.length) {
            return tasks.filter(task => {
                if (fs.name) {
                    if (!task.name.toLowerCase().includes(fs.name.toLowerCase())) {
                        return false;
                    }
                }
                if (fs.date) {
                    if (task.startDate.valueOf() !== fs.date.valueOf()) {
                        return false;
                    }
                }
                if (fs.priority) {
                    if (fs.priority != task.priority.id) {
                        return false;
                    }
                }
                if (fs.completed) {
                    if (!(fs.completed && task.completed)) {
                        return false;
                    }
                    console.log(fs.completed);
                }
                return true;
            })
        }
        else {
            return tasks;
        }
    }

}
