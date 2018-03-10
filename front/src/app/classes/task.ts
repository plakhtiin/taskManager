import {Priority} from './priority';

export class Task {
	id: number;
	name: string;
	startDate: Date;
	finishDate: Date;
	description: string;
	priority: Priority;
	completed: boolean = false;

	constructor(id: number, values: Object = {}, priority: number) {
		Object.assign(this, values);
		this.priority = new Priority(priority);
		this.id = id;
	}
}
